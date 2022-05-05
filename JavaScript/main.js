let form = document.querySelector("form");
//once submit action is performed, do this
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // console.log(event.target);
    const {
        firstname,
        lastname,
        email,
        password,
        password_confirm
    } = event.target; //object destructuring

    const data = {
        firstName:firstname.value,
        lastName:lastname.value,
        email:email.value,
        password:password.value,
        confirmPassword:password_confirm.value,
    }
    // console.log(data);
    fetch("http://localhost:5001/signup", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        cors:'no-cors',
        body: JSON.stringify(data),
    });
});

//get grab resource
//post creating resource
//put similar ^ updating resource
//delete -> delete resource