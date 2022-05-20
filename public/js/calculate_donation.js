let total = document.getElementById('total-before').firstChild.nodeValue;
let stripped = total.replace(/\$/g,'');
let donateAmount = 0;
let newTotal = 0;
const donateTotal = document.getElementById('donation-total');
const donateVal = document.getElementById('donation-amount');

const nearDollar = document.getElementById('nDollar');
const fP = document.getElementById('fiveP');
const tP = document.getElementById('tenP');
const twP = document.getElementById('twentyP');

function getNewTotal() {
    donateVal.value = donateAmount;
    newTotal = (+donateAmount) + (+stripped);
    donateTotal.innerHTML = '$' + newTotal.toFixed(2);
}


function nearestDollar() {
    let cents = stripped.substring(2);
    donateAmount = 1 - cents;
    getNewTotal();
    nearDollar.style.background = "grey";
    fP.style.background = "var(--fc_teal)";
    tP.style.background = "var(--fc_teal)";
    twP.style.background = "var(--fc_teal)";
}

function fivePercent() {
    donateAmount = (stripped * 0.05).toFixed(2);
    getNewTotal();
    fP.style.background = "grey";
    nearDollar.style.background = "var(--fc_teal)";
    tP.style.background = "var(--fc_teal)";
    twP.style.background = "var(--fc_teal)";
}

function tenPercent() {
    donateAmount = (stripped * 0.1).toFixed(2);
    getNewTotal();
    tP.style.background = "grey";
    nearDollar.style.background = "var(--fc_teal)";
    fP.style.background = "var(--fc_teal)";
    twP.style.background = "var(--fc_teal)";
}

function twentyPercent() {
    donateAmount = (stripped * 0.2).toFixed(2);
    getNewTotal();
    twP.style.background = "grey";
    nearDollar.style.background = "var(--fc_teal)";
    fP.style.background = "var(--fc_teal)";
    tP.style.background = "var(--fc_teal)";
}

function customAmount() {
    newTotal = (+donateVal.value) + (+stripped)
    donateTotal.innerHTML = '$' + newTotal.toFixed(2);
    nearDollar.style.background = "var(--fc_teal)";
    fP.style.background = "var(--fc_teal)";
    tP.style.background = "var(--fc_teal)";
    twP.style.background = "var(--fc_teal)";
}