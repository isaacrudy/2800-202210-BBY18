/* 
************************************************************************
    Source Code
    Title: Code Examples from COMP 1537 Web Development1
    Author: Arron Ferguon
    Availability: BCIT Learning Hub
	
    Edited and adapted by Amadeus Min on May 5, 2022
************************************************************************
*/
"use strict";
ready(function () {

    function ajaxPOST(url, callback, data) {

        /*
         * - Keys method of the object class returns an array of all of the keys for an object
         * - The map method of the array type returns a new array with the values of the old array
         *   and allows a callback function to perform an action on each key
         *   The join method of the arra type accepts an array and creates a string based on the values
         *   of the array, using '&' we are specifying the delimiter
         * - The encodeURIComponent function escapes a string so that non-valid characters are replaced
         *   for a URL (e.g., space character, ampersand, less than symbol, etc.)
         *
         *
         * References:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
         */
        let params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]); }
        ).join('&');

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                callback(this.responseText);

            }
        };
        xhr.open("POST", url);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }

    document.querySelector("#updateBtn").addEventListener("click", function (e) {
        e.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let check_password = document.getElementById("password_confirm").value;
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;

        const vars = { "email": email.trim(), "password": password.trim(), "password_confirm": check_password.trim(), "firstName": firstName.trim(), "lastName": lastName.trim() };
        ajaxPOST("/update", function (data) {
            if (data) {
                let dataParsed = JSON.parse(data);
                if (dataParsed.status == "fail") {
                    document.getElementById("updateErrorMsg").innerHTML = dataParsed.msg;
                } else {
                    document.getElementById("updateErrorMsg").innerHTML = dataParsed.msg;
                }
            }
        }, vars);
    });
});

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}