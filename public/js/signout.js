document.querySelector("#sign_out").addEventListener("click", ()=>{
    fetch('/logout',{
        redirect:"follow"
    }).then(response => window.location.assign("/"));
});