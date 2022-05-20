let total = document.getElementById('total-before').firstChild.nodeValue;
let stripped = total.replace(/\$/g,'');
let donateAmount = 0;
let newTotal = 0;
const donateTotal = document.getElementById('donation-total');
const donateVal = document.getElementById('donation-amount');

function getNewTotal() {
    donateVal.value = donateAmount;
    newTotal = (+donateAmount) + (+stripped);
    donateTotal.innerHTML = '$' + newTotal.toFixed(2);
}


function nearestDollar() {
    let cents = stripped.substring(2);
    donateAmount = 1 - cents;
    getNewTotal();
}

function fivePercent() {
    donateAmount = (stripped * 0.05).toFixed(2);
    getNewTotal();
}

function tenPercent() {
    donateAmount = (stripped * 0.1).toFixed(2);
    getNewTotal();
}

function twentyPercent() {
    donateAmount = (stripped * 0.2).toFixed(2);
    getNewTotal();
}

function customAmount() {
    newTotal = (+donateVal.value) + (+stripped)
    donateTotal.innerHTML = '$' + newTotal.toFixed(2);
}