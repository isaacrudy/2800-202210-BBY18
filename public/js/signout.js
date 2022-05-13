"use strict";

const signoutBtn = document.querySelector("#sign_out");
console.log(signoutBtn);
if (signoutBtn){
    signoutBtn.addEventListener("click", ()=>{
        fetch('/logout',{
            method: "POST"
        }).then(response => window.location.assign("/index.html"));
    });
}
