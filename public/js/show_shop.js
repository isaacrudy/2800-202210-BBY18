/* 
************************************************************************
    Source Code
    Title: Code Examples from COMP 1537 Web Development1
    Author: Arron Ferguon
    Availability: BCIT Learning Hub
	
    Edited and adapted by Dennis Relos on May 19, 2022
************************************************************************
*/
"use strict";
let checkAdmin = "admin";
let checkUser = "regular";


ready(function () {
    fetch("/login_check", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    }).then(response => response.json()).then((response) => {
        // if (response.msg !== checkAdmin || response.msg !== checkUser) {
        //     window.location.assign("login.html")
        // }

        if (response.msg === checkUser) {
            // console.log("Hello");
        } else if (response.msg === checkAdmin) {
            // console.log("You're an Administrator!")
        } else {
            window.location.assign("login.html");
        }
    })

});

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}
