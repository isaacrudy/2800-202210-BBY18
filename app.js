/* 
************************************************************************
	Source Code
	Title: Code Examples from COMP 1537 Web Development1
  	Author: Arron Ferguon
    Availability: BCIT Learning Hub
	
  	Edited and adapted by Amadeus Min on May 5, 2022
************************************************************************
*/

const express = require('express');
const session = require('express-session');
const { JSDOM } = require('jsdom');
const fs = require("fs");
const { query } = require('express');
const app = express();
const structureSql = fs.readFileSync("sql/create-structure.sql").toString();
const insertsql = fs.readFileSync("sql/insert-initialData.sql").toString();

app.use("/public", express.static('./public'))

// static path mappings
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/images"));
app.use("/fonts", express.static("./public/fonts"));
app.use("/html", express.static("./public/html"));
app.use("/media", express.static("./public/media"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.get('/', function (req, res) {

	let doc = fs.readFileSync("./app/html/login.html", "utf8");
	res.set("Server", "Wazubi Engine");
	res.set("X-Powered-By", "Wazubi");
	res.send(doc);
});

app.get('/home', async function (req, res) {
	if (req.session.loggedIn && req.session.role == "regular") {
		let doc = fs.readFileSync("./app/html/home.html", "utf8")
		let userDOM = new JSDOM(doc);

		userDOM.window.document.getElementsByTagName("title")[0].innerHTML
			= req.session.name + "'s Profile";
		userDOM.window.document.getElementById("userName").innerHTML
			= req.session.name;

		res.set("Server", "Wazubi Engine");
		res.set("X-Powered-By", "Wazubi");
		res.send(userDOM.serialize());

	} else if (req.session.loggedIn && req.session.role == "admin") {
		const mysql = require('mysql2/promise');
		const connection = await mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "",
			database: "mydb",
			multipleStatements: true
		});

		connection.connect();

		const [rows, fields] = await connection.execute("SELECT * FROM users");
		let table = "<table style='width:100%' border=1 frame=void rules=rows><tr><th>ID</th><th>First name</th><th>Last name</th><th>Email</th><th>Profile Photo</th><th>Role</th></tr>";
		for (let i = 0; i < rows.length; i++) {
			table += "<tr><td style='text-align:center'>" + rows[i].id + "</td><td style='text-align:center'>"
				+ rows[i].firstName + "</td><td style='text-align:center'>" + rows[i].lastName + "</td><td style='text-align:center'>"
				+ rows[i].email + "</td><td style='text-align:center'>" + rows[i].profilePhoto + "</td><td style='text-align:center'>"
				+ rows[i].role + "</td></tr>";
		}
		table += "</table>";

		await connection.end();

		let profile = fs.readFileSync("./app/html/admin.html", "utf8");
		let profileDOM = new JSDOM(profile);

		profileDOM.window.document.getElementsByTagName("title")[0].innerHTML
			= req.session.name + "'s Profile";
		profileDOM.window.document.getElementById("admin_name").innerHTML
			= "Welcome! " + req.session.name;

		profileDOM.window.document.getElementById("user_list_container").innerHTML = table;

		res.set("Server", "Wazubi Engine");
		res.set("X-Powered-By", "Wazubi");
		res.send(profileDOM.serialize());

	} else {
		// not logged in - no session and no access, redirect to home!
		res.redirect("/");
	}

});

app.post("/login", async function (req, res) {

	const mysql = require('mysql2/promise');
	const connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "mydb",
		multipleStatements: true
	});

	let loginSuccess = false;
	connection.connect();

	res.setHeader("Content-Type", "application/json");
	const [rows, fields] = await connection.execute("SELECT * from users");
	console.log("What was sent", req.body.email, req.body.password);

	// check to see if the user name matches
	for (let i = 0; i < rows.length; i++) {
		if (req.body.email == rows[i].email && req.body.password == rows[i].password) {
			loginSuccess = true;
			user_id = rows[i].id;
			email = rows[i].email;
			userFirstName = rows[i].firstName;
			userLastName = rows[i].lastName;
			userType = rows[i].role;
			break;
		} else {
			loginSuccess = false;
		}
	}

	if (loginSuccess == true) {
		// user authenticated, create a session
		req.session.loggedIn = true;
		req.session.name = userFirstName + " " + userLastName;
		req.session.user_id = user_id;
		req.session.email = email;
		req.session.role = userType;
		req.session.save(function (err) {
			// session saved
		});
		res.send({ status: "success", msg: "Logged in." });
	} else if (req.body.email == "" || req.body.password == "") {
		res.send({ status: "fail", msg: "The fields are required." });
	} else {
		res.send({ status: "fail", msg: "User account not found." });
	}
});

app.post("/add", async function (req, res) {
	const mysql = require('mysql2/promise');
	
	const connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "mydb",
		multipleStatements: true
	});

	connection.connect();
	res.setHeader("Content-Type", "application/json");
	if(req.body.password == req.body.password_confirm){
		let userRecords = "INSERT INTO users (firstName, lastName, email, password) values ?";
		let userInputs = [[req.body.firstName, req.body.lastName, req.body.email, req.body.password]];
		try {
			await connection.query(userRecords, [userInputs]);
			res.status(200).send();
		} catch (error) {
			res.status(302).send({status: "fail", msg: "Email already exists."});
		}
	}else{
		res.status(400).send({status: "fail", msg: "The passwords must match."});
	}
	connection.end();
});

app.get("/logout", function (req, res) {

	if (req.session) {
		req.session.destroy(function (error) {
			if (error) {
				res.status(400).send("Unable to log out")
			} else {
				// session deleted, redirect to home
				res.redirect("/");
			}
		});
	}
});

app.get("/signup", function (req, res) {
	let doc = fs.readFileSync("./app/html/signup.html", "utf8");

	res.set("Server", "Wazubi Engine");
	res.set("X-Powered-By", "Wazubi");
	res.send(doc);
})

async function init() {

	const mysql = require("mysql2/promise");
	const connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		multipleStatements: true
	});

	await connection.query(structureSql);

	const [user_rows, user_fields] = await connection.query("SELECT * FROM users");

	if (user_rows.length == 0) {
		await connection.query(insertsql);
	}

	connection.end();
	console.log("Listening on port " + port + "!");
}

let port = 8000;
app.listen(port, init);