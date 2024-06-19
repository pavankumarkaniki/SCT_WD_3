let resetBtnEl = document.getElementById("resetBtn");

let player = "X";
let gameArray = ["", "", "", "", "", "", "", "", ""];
let gameOn = true;
let boardSize = 3;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function buttonElements() {
    let buttonContainerEl = document.getElementById('buttonContainer');
    for (let i = 0; i < boardSize * boardSize; i++) {
        let button = document.createElement('button');
        button.setAttribute('class', 'box');
        button.setAttribute('id', `cell-${i}`);
        button.setAttribute('onclick', `boxClicked(${i})`);
        buttonContainerEl.appendChild(button);
    }
}


function checkWin() {
    for (let eachCondition of winningConditions) {
        let [a, b, c] = eachCondition;
        if (gameArray[a] !== '' && gameArray[a] === gameArray[b] && gameArray[b] === gameArray[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return gameArray.every(cell => cell !== "");
}

function boxClicked(index) {
    if (gameArray[index] === "" && gameOn) {
        gameArray[index] = player;
        let btn = document.getElementById(`cell-${index}`);
        btn.innerHTML = player;
        if (player === 'X') {
            btn.style.color = '#002FFF';
            btn.style.fontSize = "30px";
            btn.style.fontWeight = "bold";
        } else {
            btn.style.color = '#D30000';
            btn.style.fontSize = "30px";
            btn.style.fontWeight = "bold";
        }
        if (checkWin()) {
            let successMsg = document.getElementById('checkStatus');
            successMsg.innerHTML = `${player} wins!`;
            successMsg.style.fontSize = "40px"
            gameOn = false;
        } else if (checkDraw()) {
            let drawMsg = document.getElementById("checkStatus");
            drawMsg.innerHTML = `Game Draw`;
            gameOn = false;
        } else {
            player = player === 'X' ? '0' : 'X';
            document.getElementById("checkStatus").innerHTML = `${player}'s turn`;
        }

    }
}

resetBtnEl.onclick = function() {
    player = "X";
    gameArray = ["", "", "", "", "", "", "", "", ""];
    gameOn = true;
    document.getElementById("checkStatus").innerHTML = `${player}' s turn`;
    Array.from(document.getElementsByClassName("box")).forEach(eachButton => {
        eachButton.innerText = '';
        eachButton.style.color = "";
    });
};

buttonElements();