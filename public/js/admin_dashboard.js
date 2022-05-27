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

    function ajaxGET(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                callback(this.responseText);
            }
        };
        xhr.open("GET", url);
        xhr.send();
    }

    var deletebtn = document.getElementsByClassName("deleteBtn");
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var isDeleteOk = false;

    document.getElementById("delete_no_btn").addEventListener("click", function (e) {
        isDeleteOk = false;
        modal.style.display = "none";
    });

    for (let i = 0; i < deletebtn.length; i++) {
        deletebtn[i].addEventListener("click", function (e) {
            e.preventDefault();
            modal.style.display = "block";
            const vars = { "id": e.target.id };

            document.getElementById("delete_yes_btn").addEventListener("click", function (e) {
                isDeleteOk = true;
                modal.style.display = "none";
                ajaxPOST("/delete", function (data) {
                    if (data) {
                        let dataParsed = JSON.parse(data);
                        if (dataParsed.status == "fail") {
                            document.getElementById("adminErrorMsg").innerHTML = dataParsed.msg;
                        } else {
                            window.location.reload();
                        }
                    }
                }, vars);
            });
        });
    }
    var editbtn = document.getElementsByClassName("editBtn");
    for (let i = 0; i < editbtn.length; i++) {
        editbtn[i].addEventListener("click", function (e) {
            e.preventDefault();
            var id = e.target.getAttribute("id");
            window.location.href = `/common/admin_dashboard/admin_account_update.html?id=${id}`;
        });
    }

});

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}

var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("myModal");
span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};