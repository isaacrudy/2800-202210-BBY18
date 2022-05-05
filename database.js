const express = require('express');
const session = require('express-session');
const path = require('path');
const mysql = require('mysql');

const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'mydb'
});

app.get('/', function(req, res) {
	// Render login template
	res.sendFile(path.join(__dirname + '/html/login.html'));
});

app.post('/auth', function(req, res) {
	// Capture the input fields
	let email = req.body.email;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty

	if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.email = email;
				// Redirect to home page
				res.redirect('/main');
			} else {
				res.send('Incorrect Email and/or Password!');
			}			
			res.end();
		});
	}
     else {
		res.send('Please enter Email and Password!');
		res.end();
	}
});

app.get('/main', function(req, res) {
	// If the user is loggedin
	if (req.session.loggedin) {
		// Output username
		res.redirect(__dirname + '/html/login');
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
	res.end();
});
app.post('/logout', function(req, res){
	console.log("hit");
	});
	
app.listen(5500, function(){
    console.log('Listening on port 5500')
   })