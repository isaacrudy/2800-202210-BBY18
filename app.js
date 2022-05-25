/* 
************************************************************************
	Source Code
	Title: Code Examples from COMP 1537 Web Development1
	Author: Arron Ferguon
	Availability: BCIT Learning Hub
	
	Edited and adapted by Amadeus Min on May 5, 2022

	Source Code
	Title: Upload and Store Images in MySQL using Node.Js, Express, Express-FileUpload & Express-Handlebars
		Author: Raddy
	Availability: https://raddy.dev/blog/upload-and-store-images-in-mysql-using-node-js-express-express-fileupload-express-handlebars/
	
		Edited and adapted by Amadeus Min on May 11, 2022

************************************************************************
*/

"use strict"
const express = require('express');
const session = require('express-session');
const { JSDOM } = require('jsdom');
const fileUpload = require('express-fileupload');
const fs = require("fs");
const { query } = require('express');
let http = require('http');
let url = require('url');

const app = express();
const structureSql = fs.readFileSync("sql/create-structure.sql").toString();
const insertsql = fs.readFileSync("sql/insert-initialData.sql").toString();
const cors = require('cors');
const { setTimeout } = require('timers');
var corsOptions = {
	origin: '*',
}
app.use(cors(corsOptions))

// static path mappings
app.use("/", express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//http.createServer(app).listen(8000);

app.get('/', function (req, res) {
	console.log("loaded");
});

app.get('/home', async function (req, res) {
	if (req.session.loggedIn && req.session.role == "regular") {
		let doc = fs.readFileSync("./public/home.html", "utf8")

		const mysql = require('mysql2/promise');
		const connection = await mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "",
			database: "mydb",
			multipleStatements: true
		});

		connection.connect();

		const [rows, fields] = await connection.execute("SELECT * FROM users WHERE id = " + req.session.user_id);
		const [timeline_rows, timeline_fields] = await connection.execute("SELECT * FROM timelines WHERE user_id = " + req.session.user_id);


		let userDOM = new JSDOM(doc);
		let timelineErrorMsg;
		let imagePath;

		userDOM.window.document.getElementsByTagName("title")[0].innerHTML
			= req.session.name + "'s Profile";
		userDOM.window.document.getElementById("userName").innerHTML
			= req.session.name;
		userDOM.window.document.getElementById("profile_image").src = 'img/upload/' + rows[0].profilePhoto;
		if (timeline_rows.length == 0) {
			timelineErrorMsg = "You curently have no timeline posts.";
		} else {
			timelineErrorMsg = "";
			let timeline_card = "";
			let timlineImg_rows;
			for (let i = 0; i < timeline_rows.length; i++) {
				timlineImg_rows = await connection.execute("SELECT * FROM timeline_image WHERE id = " + timeline_rows[i].timeline_image_id);
				timeline_card += '<div class="timeline_card">'
					+ '<img class="timeline_img" src="img/upload/' + timlineImg_rows[0][0].timeline_photo + '" alt="timeline photo"/>'
					+ '<p class="timeline_text">' + timeline_rows[i].timeline_text + '</p>'
					+ '<p class="timeline_date_time">Posted: ' + timeline_rows[i].post_date_time + '</p>'
					+ '<input type="button" class="timeline_delete_btn" value="Delete" id="' + timeline_rows[i].id + '">'
					+ '<input type="button" class="timeline_update_btn" value="Update" id="' + timeline_rows[i].id + '">'
					+ '<div class="timeline_update_container" id="update_form_container' + timeline_rows[i].id + '"></div>'
					+ '</div>'
			}
			userDOM.window.document.getElementById("timeline_container").innerHTML = timeline_card;
		}
		userDOM.window.document.getElementById("timeline_errorMsg").innerHTML = timelineErrorMsg;

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
		let table = "<table frame=void rules=rows><tr><th>ID</th><th>First name</th><th>Last name</th><th>Email</th><th>Profile Photo</th><th>Role</th><th>Edit</th><th>Delete</th></tr>";
		let editButton = "<input type=\"button\" class=\"editBtn\" id=\"";
		let deleteButton = "<input type=\"button\" class=\"deleteBtn\" id=\"";
		for (let i = 0; i < rows.length; i++) {
			table += "<tr><td>"
				+ rows[i].id + "</td><td>"
				+ rows[i].firstName + "</td><td>" + rows[i].lastName + "</td><td>"
				+ rows[i].email + "</td><td>" + rows[i].profilePhoto + "</td><td>"
				+ rows[i].role + "</td><td>"
				+ editButton + rows[i].id + "\" value=\"O\" >" + "</td><td>"
				+ deleteButton + rows[i].id + "\" value=\"X\" >" + "<br></td></tr>";
		}
		table += "</table>";

		await connection.end();

		let profile = fs.readFileSync("public/admin.html", "utf8");
		let profileDOM = new JSDOM(profile);

		profileDOM.window.document.getElementsByTagName("title")[0].innerHTML
			= "Admin Dashboard | " + req.session.name;
		profileDOM.window.document.getElementById("admin_name").innerHTML
			= "Welcome " + req.session.name + "!";

		profileDOM.window.document.getElementById("user_list_container").innerHTML = table;

		res.set("Server", "Wazubi Engine");
		res.set("X-Powered-By", "Wazubi");
		res.send(profileDOM.serialize());

	} else {
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
	let user_id;
	let email;
	let userFirstName;
	let userLastName;
	let userType;
	let profileImage;

	connection.connect();

	res.setHeader("Content-Type", "application/json");
	const [rows, fields] = await connection.execute("SELECT * from users");

	for (let i = 0; i < rows.length; i++) {
		if (req.body.email == rows[i].email && req.body.password == rows[i].password) {
			loginSuccess = true;
			user_id = rows[i].id;
			email = rows[i].email;
			userFirstName = rows[i].firstName;
			userLastName = rows[i].lastName;
			userType = rows[i].role;
			profileImage = rows[i].profilePhoto;
			break;
		} else {
			loginSuccess = false;
		}
	}

	if (loginSuccess == true) {
		req.session.loggedIn = true;
		req.session.name = userFirstName + " " + userLastName;
		req.session.user_id = user_id;
		req.session.email = email;
		req.session.role = userType;
		req.session.profileImage = profileImage;
		req.session.save(function (err) {
		});
		res.send({ status: "success", msg: "Logged in." });
	} else if (req.body.email == "" || req.body.password == "") {
		res.send({ status: "fail", msg: "The fields are required." });
	} else {
		res.send({ status: "fail", msg: "Entered invalid input" });
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

	let isFieldEmpty = false;
	let userRecordsQuery;
	let userInputs;

	if (req.session.loggedIn = true && req.session.role == "admin") {

		if (req.body.firstName == "" || req.body.lastName == "" || req.body.email == "" || req.body.password == "" || req.body.userType == "default_message") {
			isFieldEmpty = true;
		}

		userRecordsQuery = "INSERT INTO users (firstName, lastName, email, password, profilePhoto, role) values ?";
		userInputs = [[req.body.firstName, req.body.lastName, req.body.email, req.body.password, "default_photo.png", req.body.userType]];

		signUpValidation(isFieldEmpty, userRecordsQuery, userInputs);

	} else {

		if (req.body.firstName == "" || req.body.lastName == "" || req.body.email == "" || req.body.password == "") {
			isFieldEmpty = true;
		}

		userRecordsQuery = "INSERT INTO users (firstName, lastName, email, password) values ?";
		userInputs = [[req.body.firstName, req.body.lastName, req.body.email, req.body.password]];

		signUpValidation(isFieldEmpty, userRecordsQuery, userInputs);
	}

	async function signUpValidation(isFieldEmpty, userRecordsQuery, userInputs) {

		if (isFieldEmpty == true) {
			res.status(300).send({ status: "fail", msg: "All fields are required." });
		} else if (req.body.password == req.body.password_confirm) {
			try {
				await connection.query(userRecordsQuery, [userInputs]);
				res.status(200).send({ status: "fail", msg: "User Created" });
			} catch (error) {
				res.status(302).send({ status: "fail", msg: "Email already exists." });
			}
		} else {
			res.status(400).send({ status: "fail", msg: "The passwords must match." });
		}
	}
	connection.end();
});

app.post("/delete", async function (req, res) {

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

	const [user_rows, user_fields] = await connection.query("SELECT COUNT(*) AS rolesCount FROM users WHERE role = \"admin\"");
	const [user_role, user_info] = await connection.query("SELECT * FROM users WHERE ID = " + req.body.id);

	if ((user_rows[0].rolesCount > 1 && req.session.user_id != req.body.id) || user_role[0].role == "regular") {
		let deleteQuery = "DELETE FROM users where ID = " + req.body.id;
		await connection.query(deleteQuery);
		connection.end();
		res.send({ status: "success", msg: "Deleted" })
	} else {
		res.send({ status: "fail", msg: "You cannot delete this admin user." });
	}

});

app.post('/getUser', async function (req, res) {
	const mysql = require('mysql2/promise');

	const connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "mydb",
		multipleStatements: true
	});

	connection.connect();
	let userID = req.body.id;
	const [user_role, user_info] = await connection.query("SELECT * FROM users WHERE ID = " + userID);

	res.send(JSON.stringify(user_role[0]));
});

app.post('/edit', async function (req, res) {
	const mysql = require('mysql2/promise');

	const connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "mydb",
		multipleStatements: true
	});

	const [user_rows, user_info] = await connection.query("SELECT * FROM users WHERE ID = " + req.body.id);

	if (req.body.profileImage == "default_image") {
		connection.connect();
		let query = "UPDATE `users` SET "
			+ "`password`= '" + req.body.password
			+ "', `firstName`= '" + req.body.firstName
			+ "', `lastName`= '" + req.body.lastName
			+ "', `email`= '" + req.body.email
			+ "', `profilePhoto`= '" + user_rows[0].profilePhoto
			+ "', `role`= '" + req.body.userRole
			+ "' WHERE users.id = '" + req.body.id + "'"
		await connection.query(query);
		res.status(200).send({ msg: "User Updated" });
	} else {
		connection.connect();
		let query = "UPDATE `users` SET "
			+ "`password`= '" + req.body.password
			+ "', `firstName`= '" + req.body.firstName
			+ "', `lastName`= '" + req.body.lastName
			+ "', `email`= '" + req.body.email
			+ "', `profilePhoto`= '" + req.body.profileImage
			+ "', `role`= '" + req.body.userRole
			+ "' WHERE users.id = '" + req.body.id + "'"
		await connection.query(query);
		res.status(200).send({ msg: "User Updated" });
	}
});

app.post("/update", async function (req, res) {
	const mysql = require('mysql2/promise');

	const connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "mydb",
		multipleStatements: true
	});

	let isFieldEmpty = false;

	connection.connect();
	res.setHeader("Content-Type", "application/json");

	if (req.body.firstName == "" || req.body.lastName == "" || req.body.email == "" || req.body.password == "") {
		isFieldEmpty = true;
	}
	if (isFieldEmpty == true) {
		res.send({ status: "fail", msg: "The all the fields are required." })
	} else if (req.body.password != req.body.password_confirm) {
		res.send({ status: "fail", msg: "The password does not match." });
		connection.end();
	} else {
		req.session.name = req.body.firstName + " " + req.body.lastName;
		await connection.query('UPDATE users SET password="' + req.body.password + '", password="' + req.body.password + '", firstName="' + req.body.firstName + '", lastName="' + req.body.lastName + '", email="' + req.body.email + '" WHERE ID = ' + req.session.user_id);
		res.send({ status: "success", msg: "User information has been updated." });
		connection.end();
	}
});

app.post("/uploadProfileImage", async function (req, res) {
	const mysql = require('mysql2/promise');

	const connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "mydb",
	});

	let profileImage;
	let uploadPath;

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send("No files were uploaded.");
	}

	let doc = fs.readFileSync("./public/account_info.html", "utf8")
	let userDOM = new JSDOM(doc);

	profileImage = req.files.profile_image;
	uploadPath = __dirname + '/public/img/upload/' + profileImage.name;

	profileImage.mv(uploadPath, async function (err) {
		if (err) return res.status(500).send(err);
		connection.connect();
		await connection.query('UPDATE users SET profilePhoto = ? WHERE id = ' + req.session.user_id, [profileImage.name], (err, rows) => {
			userDOM.window.document.getElementById("updateErrorMsg").innerHTML = "Profile Image Uploaded";
		});
		req.session.profileImage = profileImage;
		connection.end();
	});
	res.redirect("/home");
});

app.get("/currentAccountInfo", async function (req, res) {
	const mysql = require('mysql2/promise');

	const connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "mydb",
		multipleStatements: true
	});

	const [user_rows, user_info] = await connection.query("SELECT * FROM users WHERE ID = " + req.session.user_id);

	let updateInputHTML = '<div><input type="text" class="form_input" id="firstName" value="' + user_rows[0].firstName
		+ '" required /><input type="text" class="form_input" id="lastName" value="' + user_rows[0].lastName
		+ '" required /></div><input type="text" id="email" class="form_input" value="'
		+ user_rows[0].email + '" required /><input type="password" name="password" id="password" class="form_input" value="'
		+ user_rows[0].password + '" required /><input type="password" name="password_confirm" id="password_confirm" class="form_input" value="'
		+ user_rows[0].password + '" required /><h3 id="invalidPassword" class="invalidPassword"></h3><input id="updateBtn" type="button" class="form_input_submit" value="Update Account" />'

	connection.end;

	let updateProfile = fs.readFileSync("./public/account_info.html", "utf8");
	let profileDOM = new JSDOM(updateProfile);

	profileDOM.window.document.getElementById("update_form").innerHTML = updateInputHTML;

	res.set("Server", "Wazubi Engine");
	res.set("X-Powered-By", "Wazubi");
	res.send(profileDOM.serialize());
});

app.get("/faq", function (req, res) {
	let doc = fs.readFileSync("./public/faq.html", "utf8")
	let userDOM = new JSDOM(doc);

	res.set("Server", "Wazubi Engine");
	res.set("X-Powered-By", "Wazubi");
	res.send(userDOM.serialize());
});

app.get("/charities", function (req, res) {
	let doc = fs.readFileSync("./public/charities.html", "utf8")
	let userDOM = new JSDOM(doc);

	res.set("Server", "Wazubi Engine");
	res.set("X-Powered-By", "Wazubi");
	res.send(userDOM.serialize());
});

app.get("/history", function (req, res) {
	let doc = fs.readFileSync("./public/history.html", "utf8")
	let userDOM = new JSDOM(doc);

	res.set("Server", "Wazubi Engine");
	res.set("X-Powered-By", "Wazubi");
	res.send(userDOM.serialize());
});

app.get("/signin", function (req, res) {
	if (req.session.loggedIn) {
		let doc = fs.readFileSync("./public/index.html", "utf8");
		let userDOM = new JSDOM(doc);
		res.set("Server", "Wazubi Engine");
		res.set("X-Powered-By", "Wazubi");
		res.send(userDOM.serialize());
	} else {
		let doc = fs.readFileSync("./public/login.html", "utf8");
		let userDOM = new JSDOM(doc);
		res.set("Server", "Wazubi Engine");
		res.set("X-Powered-By", "Wazubi");
		res.send(userDOM.serialize());
	}
});

app.post("/logout", function (req, res) {
	if (req.session) {
		req.session.destroy(function (error) {
			if (error) {
				res.status(400).send("Unable to log out")
			} else {
				res.status(200).send();
			}
		});
	}
});

app.post("/isLoggedIn", function (req, res) {
	// if (req.session.loggedIn = true) {
	// 	document.getElementById("account_buttons").innerHTML =
	// 		"<div id='profile_dropdown_content'> " + 
	// 		"<input type='button' value='My timeline' id='my_timeline_btn'>" + 
	// 		"<input type='button' value='Account Management' id='accocunt_management'>" + 
	// 		"<input type='button' value='Donation History' id='donation_history_btn'>" + 
	// 		"<input type='button' value='Logout' id='logout_btn' onclick='signout()'> </div>"
	// } else {
	// 	document.getElementById("account_buttons").innerHTML =
	// 		"<button onclick='signout()' id='sign_out'>Logout</button>"
	// }
});

app.get("/signup", function (req, res) {
	if (req.session.loggedIn = true && req.session.role == "admin") {
		let doc = fs.readFileSync("./public/admin_signup.html", "utf8");

		res.set("Server", "Wazubi Engine");
		res.set("X-Powered-By", "Wazubi");
		res.send(doc);
	} else {

		let doc = fs.readFileSync("./public/signup.html", "utf8");

		res.set("Server", "Wazubi Engine");
		res.set("X-Powered-By", "Wazubi");
		res.send(doc);
	}
});

app.get("/login_check", function (req, res){
	if (req.session.loggedIn = true && req.session.role == "regular") {
		res.status(200).send({msg: "regular"});
	}else if(req.session.loggedIn = true && req.session.role == "admin"){
		res.send({msg: "admin"})
	}else{
		res.send({msg: "redirect"});
	}

})

app.get("/timelineForm", function (req, res) {
	res.setHeader("Content-Type", "text/html");
	res.send(fs.readFileSync("./public/data/timeline-form-html.js", "utf8"));
});

app.get("/loginPage", function (req, res) {
	if (req.session.loggedIn = true) {

	}
});

app.post("/createTimeline", async function (req, res) {
	const mysql = require('mysql2/promise');

	const connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "mydb",
		multipleStatements: true
	});

	let today = new Date();
	let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	let dateTime = date + ' ' + time;

	let addTimelineQuery;
	let timelineInputs;

	let timelineImage;
	let uploadPath;

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send("No files were uploaded.");
	}

	timelineImage = req.files.timeline_image;
	uploadPath = __dirname + '/public/img/upload/' + timelineImage.name;

	timelineImage.mv(uploadPath, async function (err) {
		if (err) return res.status(500).send(err);
		connection.connect();
		await connection.query('INSERT INTO timeline_image (timeline_photo) VALUES ("' + timelineImage.name + '")');
		const [uploaded_row_id] = await connection.query("SELECT MAX(id) AS uploadedID from timeline_image");

		addTimelineQuery = "INSERT INTO timelines (user_id, timeline_image_id, timeline_text, post_date_time) values ?";
		timelineInputs = [[req.session.user_id, uploaded_row_id[0].uploadedID, req.body.content, dateTime]];
		await connection.query(addTimelineQuery, [timelineInputs]);

		connection.end();
	});
	setTimeout(redirectPage, 500);

	function redirectPage() {
		res.redirect("/home");
	}
})

app.post("/updateTimelineForm", async function (req, res) {
	const mysql = require('mysql2/promise');

	const connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "mydb",
		multipleStatements: true
	});

	connection.connect();

	req.session.updateTimelineID = req.body.id;

	const [timeline_rows, timeline_fields] = await connection.execute("SELECT * FROM timelines WHERE id = " + req.body.id);

	let timline_update_form = "";
	timline_update_form += '<form id="timeline_update_form" action="/updateTimeline" method="POST" enctype="multipart/form-data">'
		+ '<h2>Edit post</h2>'
		+ '<div class="image_uploader_container"><label class="timeline_image_label" for="timeline_image_update">'
		+ '<i class="fa fa-file-upload"></i>Select your file</label>'
		+ '<input id="timeline_image_update" name="timeline_image" type="file" accept="image/*" /></div>'
		+ '<textarea id="timeline_content_update" name="content" type="text" rows="4" cols="50">' + timeline_rows[0].timeline_text + '</textarea>'
		+ '<input id="timeline_update_btn" type="submit" value="Update"></input>'
		+ '</form>';
	res.setHeader("Content-Type", "text/html");
	res.send(timline_update_form);
	connection.end();
})

app.post("/updateTimeline", async function (req, res) {
	const mysql = require('mysql2/promise');

	const connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "mydb",
		multipleStatements: true
	});

	let timelineImage;
	let uploadPath;

	connection.connect();
	if (!req.files || Object.keys(req.files).length === 0) {
		await connection.query('UPDATE timelines SET timeline_text="' + req.body.content + '" WHERE ID = ' + req.session.updateTimelineID);
		connection.end();
	} else {
		timelineImage = req.files.timeline_image;
		uploadPath = __dirname + '/public/img/upload/' + timelineImage.name;

		timelineImage.mv(uploadPath, async function (err) {
			if (err) return res.status(500).send(err);

			await connection.query('INSERT INTO timeline_image (timeline_photo) VALUES ("' + timelineImage.name + '")');
			const [uploaded_row_id] = await connection.query("SELECT MAX(id) AS uploadedID from timeline_image");

			await connection.query('UPDATE timelines SET timeline_image_id="' + uploaded_row_id[0].uploadedID + '", timeline_text="' + req.body.content + '" WHERE ID = ' + req.session.updateTimelineID);
			connection.end();
		});
	}
	setTimeout(redirectPage, 500);

	function redirectPage() {
		res.redirect("/home");
	}

});

app.post("/deleteTimeline", async function (req, res) {

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

	await connection.query("DELETE FROM timelines where id = " + req.body.id);
	connection.end();
	res.send({ status: "success", msg: "Deleted" })

});

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
}

app.use(function (req, res, next) {
	res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Please check your url.</p></body></html>");
});

let port = 8000;
app.listen(process.env.PORT || port, init);

