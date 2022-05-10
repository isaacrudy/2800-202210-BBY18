"use strict";
ready(function(){
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      fetch("/edit", {
        method: "POST",
        body: JSON.stringify({id:params.id}),
        headers: {
          "Content-Type": "application/json"
        }
      })
});

function ready(callback) {
  if (document.readyState != "loading") {
      callback();
  } else {
      document.addEventListener("DOMContentLoaded", callback);
  }
}