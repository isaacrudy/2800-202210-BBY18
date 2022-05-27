document.querySelector('.toggler').addEventListener('change', function () {
    if (this.checked) {
        document.body.style.overflowY = 'hidden';
        document.getElementById("wrapper").style.zIndex = '-1';
    } else {
        document.body.style.overflowY = '';
        document.getElementById("wrapper").style.zIndex = '0';
    }
});