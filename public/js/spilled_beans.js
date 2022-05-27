let text = document.getElementById('bean-header');
const beans = document.getElementById('beans');


function spill() {
    text.innerHTML = 'You spilled the beans!';
    beans.style.background = 'url(../../img/demo_page/spilled_beans_small.png)';
}

function revert() {
    setTimeout(() => {
        text.innerHTML = 'Canned Beans';
        beans.style.background = 'url(../../img/demo_page/tin_can_small.png)';
    }, 2000);
}