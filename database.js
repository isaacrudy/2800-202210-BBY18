const express = require('express');
const session = require('express-session');
const path = require('path');
const mysql = require('mysql');

const app = express();
app.use("/public", express.static('public'))
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
console.log(path.join(__dirname, '/public'))

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
			let role = results.role;
			if (results.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.email = email;
				// Redirect to home page
				if(role == 'admin'){
					res.redirect('/admin');
				}else{
					res.redirect('/main');
				}
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
app.get('/admin', function(req, res){
	if (req.session.loggedin) {
		return res.sendFile(path.join(__dirname, '/html/index.html')); 
	} else {
		//create error side
		res.send('Please login to view this page!');
	}
	res.end();
})
app.get('/main', function(req, res) {
	// If the user is loggedin
	if (req.session.loggedin) {
		return res.sendFile(path.join(__dirname, '/html/admin.html'));
	} else {
		//create error side
		res.send('Please login to view this page!');
	}
	res.end();
});
app.get('/logout', function(req, res){
	if (req.session) {
		req.session.destroy(function(err){
		  if (err) {
			res.status(400).send('Unable to log out')
		  } else {
			res.send('Logout successful')
		  }
		});
	  } else {
		res.end()
	  }
});
	
app.listen(5500, function(){
    console.log('Listening on port 5500')
   })