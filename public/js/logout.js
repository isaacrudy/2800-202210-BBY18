document.querySelector("#logout").addEventListener("click", ()=>{
    fetch('/logout',{
        redirect:"follow"
    }).then(response => window.location.assign("/"));
});