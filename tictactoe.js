const gridInside = document.querySelector('.grid__inside');
const grid = [];
const sign = [];
var cross = false;
var stop = false;
var isActive = [];
var moves = 0;
const circleTurn = document.querySelector('.turn__circle');
const crossTurn = document.querySelector('.turn__cross');
const win = document.querySelector('.navbar__win');
const reload = document.querySelector('#signup');

//changing the color of the word circle
window.onload = function () {
    (function () {
        circleTurn.classList.add('turn');
    })();
};

//switching the turns
const changeTurn = (i) => {
    if (!stop && !isActive[i]) {
        circleTurn.classList.toggle('turn');
        crossTurn.classList.toggle('turn');
    } else if (stop) {
        circleTurn.classList.remove('turn');
        crossTurn.classList.remove('turn');
    }
}

const winInfo = (sign) => {
    if (sign == "nobody") {
        win.textContent = "That's a tie!";
    } else {
        win.textContent = sign + " won!";
    }
    reload.textContent = "Again?";
    reload.classList.add('button');
}

const addSign = (i) => {
    if (!isActive[i]) {
        if (cross) {
            sign[i].classList.toggle('cross');
        } else {
            sign[i].classList.toggle('circle');
        }
        isActive[i] = true;
        cross = !cross;
        moves++;
    }
}


//disabling ability to add signs
const deactivate = () => {
    for (let i = 0; i < 9; i++)
        isActive[i] = true;
    stop = true;
}

const checkWin = () => {
    if (!stop) {
        //checks horizontal
        for (let i = 0; i < 9; i += 3) {
            if (sign[i].classList.contains('circle') && sign[i + 1].classList.contains('circle') && sign[i + 2].classList.contains('circle')) {
                winInfo("Circle");
                deactivate();
            } else if (sign[i].classList.contains('cross') && sign[i + 1].classList.contains('cross') && sign[i + 2].classList.contains('cross')) {
                winInfo("Cross");
                deactivate();
            }
        }
        //checks vertical
        for (let i = 0; i < 3; i++) {
            if (sign[i].classList.contains('circle') && sign[i + 3].classList.contains('circle') && sign[i + 6].classList.contains('circle')) {
                winInfo("Circle");
                deactivate();
            } else if (sign[i].classList.contains('cross') && sign[i + 3].classList.contains('cross') && sign[i + 6].classList.contains('cross')) {
                winInfo("Cross");
                deactivate();
            }
        }
        //checks diagonal
        if (sign[2].classList.contains('circle') && sign[4].classList.contains('circle') && sign[6].classList.contains('circle')) {
            winInfo("Circle");
            deactivate();
        } else if (sign[2].classList.contains('cross') && sign[4].classList.contains('cross') && sign[6].classList.contains('cross')) {
            winInfo("Cross");
            deactivate();
        } else if (sign[0].classList.contains('circle') && sign[4].classList.contains('circle') && sign[8].classList.contains('circle')) {
            winInfo("Circle");
            deactivate();
        } else if (sign[0].classList.contains('cross') && sign[4].classList.contains('cross') && sign[8].classList.contains('cross')) {
            winInfo("Cross");
            deactivate();
        }
        //check if any moves left
        if (moves == 9) {
            winInfo("nobody");
            deactivate();
        }
    }
}

//making an array for 9 grid elements and adding eventlisteners to each of them
for (let i = 0; i < 9; i++) {
    grid[i] = document.querySelector('#grid__' + (i + 1));
    sign[i] = document.querySelector('#sign__' + (i + 1));
    isActive[i] = false;
    grid[i].addEventListener('click', function () {
        changeTurn(i);
        addSign((i));
        checkWin();
    });
}