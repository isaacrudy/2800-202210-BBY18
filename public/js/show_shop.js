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
const fail = "redirect";


ready(function () {
    fetch("/login_check", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json()).then((response) => {
        if (response.msg === fail) {
            window.location.assign("/signin");
        }
    });

});

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}
