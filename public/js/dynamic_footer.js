"use strict";

const sign_in = document.getElementById("footer-sign-in");
const timeline = document.getElementById("footer-timeline");
const dashboard = document.getElementById("footer-dashboard");


ready(function () {
    fetch("/login_check", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    }).then(response => response.json()).then((response) => {
        if (response.msg === "admin") {
            dashboard.style.display = "block";
            sign_in.style.display = "none";
        } else if (response.msg === "regular")
        {
            timeline.style.display = "block";
            sign_in.style.display = "none";
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
