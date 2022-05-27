let kCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let buttonpress = 0;
let invoked = false;
let originalTitle = document.getElementById('textbox-title').innerHTML;
let originalContent = document.getElementById('textbox').innerHTML;
let title = document.getElementById('textbox-title');
let text = document.getElementById('textbox');
let options = document.getElementById("option-container");
let cont = document.getElementById("continue-container");
options.style.display = "none";
cont.style.display = "none";
let storyindex = 0;
let shouldExit = false;
let isWizard = false;

const story =
    [
        [
            {
                txt: "Would you like to play the Game? <br><br>1. Yes <br>2. No"
            }
        ],
        [
            {
                txt: "You see an evil green witch hovering over your precious town. Being the experienced witch hunter you are, you immediately duck for cover as she lets off a fireball on your town.<br><br> **BOOM** <br><br> As the town is now in shambles you hear the witch cackling, heading towards the mountains where you know there's a cave <br><br> What do you do? <br><br> 1. Chase the Witch <br> 2. Give up and start life anew",
            },
            {
                txt: "Goodbye.",
                action: () => {
                    document.getElementById('continue').innerText = "Goodbye";
                },
                exit: true
            }
        ],
        [
            {
                txt: "You find yourself infront of the cave and you enter.",
            },
            {
                txt: "You fool. What kind of witch hunter gives up? Your family has been cursed for generations. Good luck!",
                action: () => {
                    document.getElementById('continue').innerText = "The End";
                },
                exit: true
            }
        ],
        [
            {
                txt: "The cave splits into two paths. You hear hissing coming from the left path and cackling on the right, what do you do?  <br><br> 1. Left <br> 2. Right",
            }
        ],
        [
            {
                txt: "A snake slivers up your pants, up your shirt, to your neck and takes a big bite. <br><br>Your muscles slowly tense up before your heart stops beating. <br><br>You've Died",
                action: () => {
                    document.getElementById('continue').innerText = "The End";
                },
                exit: true
            },
            {
                txt: "You go futher down the tunnel and head into a large room with little flies buzzing around. <br><br> 1. Investigate the room <br> 2. Ignore the flies - continue to the next room"
            }
        ],
        [
            {
                txt: "One of the flies lands and you take a closer look. Upon investigation you realize that the flies are actually little green witches flying on broomsticks cackling. <br><br> They begin chanting and cast a curse on you. <br><br> You see that you have become a tiny green witch.",
                action: () => {
                    document.getElementById('continue').innerText = "The End";
                },
                exit: true

            },
            {
                txt: "This room is made of pure gold. A chamber that looks like it's built for kings! You see a sword on one side of the room and a wand at the other end. <br><br> 1. Go for the sword <br> 2. Go for the wand"
            }
        ],
        [
            {
                txt: "With your new sword in hand you continue on. Hours go by making it seem like this tunnel doesn't end. As you approach your wits end you hear a voice.",
                action: () => {
                    isWizard = false;
                    title.innerHTML = knight();
                }
            },
            {
                txt: "With the wand in hand, you feel like you've been bestowed with sweet wizard powers. Feeling like you're capable of casting the most dangerous magicks, the wand talks to you. <br> \"YO MY DUDE FINALLY SOMEONE PICKED ME UP. HERE'S SOME SICK WIZARD SPELLS\" <br><br> The wand casts fly on you and you fly onwards. <br><br> You eventually hear a voice.",
                action: () => {
                    isWizard = true;
                    title.innerHTML = wizard();
                }
            }
        ],
        [
            {
                txt: "A familiar voice. Cackling. You see the witch hovering in the air. It's face filled with warts about to burst with pus. As she flashes a brown smile she says. <br><br> \"Ah so you've come have you? After I've had so much fun burning down your village! Prepare to fight!\" The rancid green Witch says"
            }
        ],
        [
            {
                txt: "",
                action: () => {
                    if (isWizard) {
                        text.innerHTML = "You cast a spell, annihilating the rancid being from existence. You exit the cave and resurrect the villagers with the wand as undead servants. Years pass and you become an evil lich, ruling over the kingdom for eternity.<br><br> The end.";
                        shouldExit = true;
                        document.getElementById('continue').innerText = "The End";
                    } else {
                        text.innerHTML = "Exhausted, You start the battle. <br><br>The fight rages on. <br><br>Hours go by. <br><br>Nearly avoiding death with every spell that is cast towards you. But you're determined. You see an opening! <br><br>You take the chance and close the distance and with one fell swoop. <br><br>You've won. <br><br>Completely exhausted from the fight you collapse; unable to move. You feel your life slowly fade away.";
                    }
                }
            }
        ],
        [
            {
                txt: "Was it worth it?",
                action: () => {
                    document.getElementById('continue').innerText = "The End";
                },
                exit: true
            }
        ]
    ];

let konamiCode = function (event) {
    if (!invoked) {
        console.log(event.key);
        if (kCode.indexOf(event.key) < 0 || event.key !== kCode[buttonpress]) {
            buttonpress = 0;
            return;
        }
        buttonpress++;
        if (kCode.length === buttonpress) {
            buttonpress = 0;
            launchGame();
        }
    }
};
document.addEventListener('keydown', konamiCode);

function displayGameButtons() {
    let requiresOptions = story[storyindex + 1] && story[storyindex + 1].length == 2;
    if (shouldExit) {
        cont.style.display = "block";
        options.style.display = "none";
    } else {
        if (requiresOptions) {
            cont.style.display = "none";
            options.style.display = "block";
        } else {
            cont.style.display = "block";
            options.style.display = "none";
        }
    }
}

function launchGame() {
    title.innerHTML = "Welcome to the Game";
    document.getElementById('continue').innerText = "Continue";
    invoked = true;
    shouldExit = false;
    storyindex = 0;
    text.innerHTML = story[storyindex][0].txt;
    displayGameButtons();
}

document.getElementById("play-game").addEventListener("click", function (e) {
    e.preventDefault();

    launchGame();
});

function continueGame(option) {
    if (shouldExit) {
        exitGame();
    } else {
        storyindex += 1;
        text.innerHTML = story[storyindex][option].txt;
        shouldExit = story[storyindex][option].exit;
        if (story[storyindex][option].action) {
            story[storyindex][option].action();
        }
        if (!story[storyindex + 1]) {
            shouldExit = true;
        }
        displayGameButtons();
    }
}
function exitGame() {
    invoked = false;
    title.innerHTML = originalTitle;
    text.innerHTML = originalContent;
    cont.style.display = "none";
    options.style.display = "none";
}

function knight() {
    return `<pre>
    You are a knight
    ,^.
    |||
    |||       _T_
    |||   .-.[:|:].-.
    ===_ /\\|  "'"  |/
     E]_|\\/ \\--|-|''''|
     O  *'  '=[:]| A  |
            /""""|  P |
           /"""""'.__.'
          []"/"""\\"[]
          | \\     / |
          | |     | |
        <\\\\\\)     (///>
    </pre>    `;
}

function wizard() {
    return `<pre>
    You are a Wizard (harry)
    C
    (\\.   \\      ,/)
     \\(   |\\     )/
     //\\  | \\   /\\\\
    (/ /\\_#oo#_/\\ \\)
     \\/\\  ####  /\\/
          \\*##'
    </pre>`;
}