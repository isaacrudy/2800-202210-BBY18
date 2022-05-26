"use strict";
function signout() {
    fetch('/logout', {
        method: "POST"
    }).then(response => window.location.assign("/index.html"));
}