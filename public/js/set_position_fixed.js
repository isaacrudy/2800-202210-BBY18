document.querySelector('.toggler').addEventListener('change', function() {
    if (this.checked) {
        document.body.style.overflowY = 'hidden'
    }else {
        document.body.style.overflowY = '';
    }
});