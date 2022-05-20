function loadOnce() 
{ 
    var counter = 1;

    if (counter > 0){
        window.location.reload();
        counter -= 1;
    }
}