const express = require("express");
const session = require("express-session");
const app = express();
const fs = require("fs");
const { JSDOM } = require('jsdom');

app.use(session(
    {
        secret: "extra text that no one will guess",
        name: "wazaSessionID",
        resave: false,
        // create a unique identifier for that client
        saveUninitialized: true
    })
);

app.get("/profile", async function (req, res) {

    // check for a session first!
    if (req.session.loggedIn) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "assignment6",
            multipleStatements: true
        });

        connection.connect();
        const [rows, fields] = await connection.execute("SELECT * FROM user_login WHERE user_ID= " + req.session.user_id);
        let table = "<table><tr><th>ID</th><th>User Name</th><th>First Name</th><th>last Name</th><th>Email</th></tr>";
        for (let i = 0; i < rows.length; i++) {
            table += "<tr><td>" + rows[i].timeline_ID + "</td><td>" + rows[i].post_text + "</td><td>" + rows[i].post_date + "</td><td>"
                + rows[i].post_time + "</td><td>" + rows[i].number_of_view + "</td></tr>";
        }

        console.log("rows", rows);
        // don't forget the '+'
        table += "</table>";
        await connection.end();

        let profile = fs.readFileSync("./app/html/profile.html", "utf8");
        let profileDOM = new JSDOM(profile);

        // great time to get the user's data and put it into the page!
        profileDOM.window.document.getElementsByTagName("title")[0].innerHTML
            = req.session.name + "'s Profile";
        profileDOM.window.document.getElementById("profile_name").innerHTML
            = req.session.name;

        profileDOM.window.document.getElementById("user_timeline_container").innerHTML = table;

        res.set("Server", "Wazubi Engine");
        res.set("X-Powered-By", "Wazubi");
        res.send(profileDOM.serialize());

    } else {
        // not logged in - no session and no access, redirect to home!
        res.redirect("/");
    }

});
