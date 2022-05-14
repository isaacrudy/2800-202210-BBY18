document.querySelector('.toggler').addEventListener('change', function() {
    if (this.checked) {
        document.body.style.overflowY = 'hidden'
        document.getElementById("user_list_container").style.zIndex = '-1'
    }else {
        document.body.style.overflowY = '';
        document.getElementById("user_list_container").style.zIndex = '0'
    }
});