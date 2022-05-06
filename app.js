const express = require('express');
const session = require('express-session');
const { JSDOM } = require('jsdom');
const fs = require("fs");
// const { redirect } = require('express/lib/response');
//const mysql = require('mysql2/promise');
const app = express();
const structureSql = fs.readFileSync("sql/create-structure.sql").toString();
const insertsql = fs.readFileSync("sql/insert-initialData.sql").toString();
//const path = require('path');

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

//app.use(express.static(path.join(__dirname, '/public')));

//console.log(path.join(__dirname, '/public'))

app.get('/', function (req, res) {
	// Render login template
	//res.sendFile(path.join(__dirname + '/html/login.html'));

	// if (req.session.loggedIn) {
	// 	res.redirect("/admin");
	// }

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
		let table = "<table><tr><th>ID</th><th>First name</th><th>Last name</th><th>Email</th><th>Profile Photo</th><th>Role</th></tr>";
		for (let i = 0; i < rows.length; i++) {
			table += "<tr><td>" + rows[i].id + "</td><td>" + rows[i].firstName + "</td><td>" + rows[i].lastName + "</td><td>"
				+ rows[i].email + "</td><td>" + rows[i].profilePhoto + "</td><td>" + rows[i].role + "</td></tr>";
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

// app.get("/profile", async function (req, res) {

// 	// check for a session first!
// 	if (req.session.loggedIn) {
// 		const mysql = require('mysql2/promise');
// 		const connection = await mysql.createConnection({
// 			host: "localhost",
// 			user: "root",
// 			password: "",
// 			database: "mydb",
// 			multipleStatements: true
// 		});

// 		connection.connect();
// 		const [rows, fields] = await connection.execute("SELECT * FROM users");
// 		let table = "<table><tr><th>ID</th><th>First name</th><th>Last name</th><th>Email</th><th>Profile Photo</th><th>Role</th></tr>";
// 		for (let i = 0; i < rows.length; i++) {
// 			table += "<tr><td>" + rows[i].id + "</td><td>" + rows[i].firstName + "</td><td>" + rows[i].lastName + "</td><td>"
// 				+ rows[i].email + "</td><td>" + rows[i].profilePhoto + "</td><td>" + rows[i].role + "</td></tr>";
// 		}

// 		console.log("rows", rows);
// 		// don't forget the '+'
// 		table += "</table>";
// 		await connection.end();

// 		let profile = fs.readFileSync("./app/html/admin.html", "utf8");
// 		let profileDOM = new JSDOM(profile);

// 		// great time to get the user's data and put it into the page!
// 		profileDOM.window.document.getElementsByTagName("title")[0].innerHTML
// 			= req.session.name + "'s Profile";
// 		profileDOM.window.document.getElementById("profile_name").innerHTML
// 			= req.session.name;

// 		profileDOM.window.document.getElementById("user_list_container").innerHTML = table;

// 		res.set("Server", "Wazubi Engine");
// 		res.set("X-Powered-By", "Wazubi");
// 		res.send(profileDOM.serialize());

// 	} else {
// 		// not logged in - no session and no access, redirect to home!
// 		res.redirect("/");
// 	}

// });

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
		res.send({ status: "fail", msg: "The fileds are required." });
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

	let userRecords = "INSERT INTO users (firstName, lastName, email, password) values ?";
	let userInputs = [[req.body.firstName, req.body.lastName, req.body.email, req.body.password]];

	await connection.query(userRecords, [userInputs]);

	connection.end();

	res.redirect("/");
});


// app.post('/auth', function (req, res) {
// 	// Capture the input fields
// 	let email = req.body.email;
// 	let password = req.body.password;
// 	// Ensure the input fields exists and are not empty

// 	if (email && password) {
// 		// Execute SQL query that'll select the account from the database based on the specified username and password
// 		connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
// 			let role = results.role;
// 			if (results.length > 0) {
// 				// Authenticate the user
// 				req.session.loggedin = true;
// 				req.session.email = email;
// 				// Redirect to home page
// 				if (role == 'admin') {
// 					res.redirect('/admin');
// 				} else {
// 					res.redirect('/main');
// 				}
// 			} else {
// 				res.send('Incorrect Email and/or Password!');
// 			}
// 			res.end();
// 		});
// 	}
// 	else {
// 		res.send('Please enter Email and Password!');
// 		res.end();
// 	}
// });

// app.get('/admin', function (req, res) {
// 	if (req.session.loggedin) {
// 		return res.sendFile(path.join(__dirname, '/html/index.html'));
// 	} else {
// 		//create error side
// 		res.send('Please login to view this page!');
// 	}
// 	res.end();
// })

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