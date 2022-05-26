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

    var timeline_form_container = document.getElementById("timeline_form_container");
    var timeline_open_form = document.querySelector("#open_timeline_form_btn");
    timeline_form_container.style.display = "none";

    timeline_open_form.addEventListener("click", function (e) {
        if (timeline_form_container.style.display == "none") {
            ajaxGET("/timelineForm", function (data) {
                timeline_open_form.value = "Close";
                document.getElementById("timeline_form_container").innerHTML = data;
                timeline_form_container.style.display = "block";
            });
        } else {
            timeline_open_form.value = "Add Timeline";
            timeline_form_container.style.display = "none";
        }
    });

    var timeline_update_btn = document.getElementsByClassName("timeline_update_btn");
    var timeline_update_container = [];
    for (let i = 0; i < timeline_update_btn.length; i++) {
        timeline_update_container[i] = document.getElementById("update_form_container" + timeline_update_btn[i].id);
        timeline_update_container[i].style.display = "none";
        timeline_update_btn[i].addEventListener("click", function (e) {
            e.preventDefault();
            const vars = { "id": e.target.id };
            ajaxPOST("/updateTimelineForm", function (data) {
                if (data) {
                    if (timeline_update_container[i].style.display == "none") {
                        timeline_update_btn[i].value = "Close";
                        timeline_update_container[i].innerHTML = data;
                        timeline_update_container[i].style.display = "block";
                    } else {
                        timeline_update_container[i].style.display = "none";
                        timeline_update_btn[i].value = "Update";
                    }
                }
            }, vars);
        });
    }

    var timeline_delete_btn = document.getElementsByClassName("timeline_delete_btn");
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var isDeleteOk = false;



    document.getElementById("delete_no_btn").addEventListener("click", function (e) {
        isDeleteOk = false;
        modal.style.display = "none";
    });

    for (let i = 0; i < timeline_delete_btn.length; i++) {
        timeline_delete_btn[i].addEventListener("click", function (e) {
            e.preventDefault();
            modal.style.display = "block";
            const vars = { "id": e.target.id };

            document.getElementById("delete_yes_btn").addEventListener("click", function (e) {
                isDeleteOk = true;
                modal.style.display = "none";

                ajaxPOST("/deleteTimeline", function (data) {
                    if (data) {
                        let dataParsed = JSON.parse(data);
                        if (dataParsed.status == "fail") {
                            document.getElementById("timeline_errorMsg").innerHTML = dataParsed.msg;
                        } else {
                            window.location.reload();
                        }
                    }
                }, vars);
            });
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

var numberOfClicks = 0;
document.getElementById("userName").addEventListener("click", function (e) {
    numberOfClicks++;
    if (numberOfClicks == 7) {
        document.getElementById("easterEgg_btn").style.display = "block";
        numberOfClicks = 0;
    } else {
        document.getElementById("easterEgg_btn").style.display = "none";
    }
});

var easterEgg = document.getElementById("easterEgg_container");
easterEgg.style.display = "none";

document.getElementById("easterEgg_btn").addEventListener("click", function (e) {
    if (easterEgg.style.display == "none") {
        easterEgg.style.display = "block";
        document.getElementById("easterEgg_game").src = "https://cdn.htmlgames.com/FishingTrip/";
    } else {
        easterEgg.style.display = "none";
        document.getElementById("easterEgg_game").src = "";
    }
});


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