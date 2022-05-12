"use strict";

const signoutBtn = document.querySelector("#sign_out");
if (signoutBtn){
    signoutBtn.addEventListener("click", ()=>{
        fetch('/logout',{
            method: "POST"
        }).then(response => window.location.assign("/index.html"));
    });
}
