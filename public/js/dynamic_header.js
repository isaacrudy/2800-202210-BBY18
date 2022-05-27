"use strict";
const logged_in = document.getElementById("logged_in");
const logged_out = document.getElementById("sign_in");
const timeline_button = document.getElementById("my_timeline_btn");
const dasbhoard_button = document.getElementById("dashboard_btn");


ready(function () {
    fetch("/login_check", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    }).then(response => response.json()).then((response) => {

        if (response.msg === "redirect") {
            logged_out.style.display = "block";
        } else if ( response.msg === "admin") {
            logged_in.style.display = "block";
            dasbhoard_button.style.display = "inline-block";
        } else if (response.msg === "regular") {
            logged_in.style.display = "block";
            timeline_button.style.display = "inline-block";
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

var profile_menu_content = document.getElementById("profile_dropdown_content");
profile_menu_content.style.display = "none";
document.getElementById("logged_in").addEventListener("click", function (e) {
    if (profile_menu_content.style.display == "none") {
        if (window.innerWidth >= 1150) {
            profile_menu_content.style.display = "flex";
        } else {
            profile_menu_content.style.display = "block";
        }
    } else {
        profile_menu_content.style.display = "none";
    }

});

document.querySelector("#accocunt_management").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.replace("/currentAccountInfo");
});

document.querySelector("#my_timeline_btn").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.replace("/home");
});

document.querySelector("#dashboard_btn").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.replace("/home");
});

document.querySelector("#donation_history_btn").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.replace("/history");
});