"use strict";

ready(async function () {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let res = await fetch("/getUser", {
    method: "POST",
    body: JSON.stringify({ id: params.id }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json());

  document.getElementById("firstName").value = res.firstName;
  document.getElementById("lastName").value = res.lastName;
  document.getElementById("email").value = res.email;
  document.getElementById("password").value = res.password;
  document.getElementById("userRole").value = res.role;


  document.querySelector("#updateBtn").addEventListener("click", function (e) {
    e.preventDefault();
    let userID = params.id;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let userRole = document.getElementById("userRole").value;
    let userProfileImage = document.getElementById("profileImage").value;
    const vars = { "id": userID, "email": email.trim(), "password": password.trim(), "firstName": firstName.trim(), "lastName": lastName.trim(), "userRole": userRole, "profileImage": userProfileImage };
    fetch("/edit", {
      method: "POST",
      body: JSON.stringify(vars),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json()).then((response) => {
      document.getElementById("error-message").innerHTML = response.msg;
    });

  });
});

function ready(callback) {
  if (document.readyState != "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}
