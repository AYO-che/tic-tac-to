let currentplayer = "X";
let zone = ["", "", "", "", "", "", "", "", ""];
let plyerXscore = Number(localStorage.getItem("playerXScore")) || 0;
let plyerOscore = Number(localStorage.getItem("playerOScore")) || 0;

let cells = document.getElementsByClassName("cell");
let mzssage = document.getElementById("message");
let turn = document.getElementById("turn");
let foundw = false;

function updatescore() {
    document.getElementById("scoreX").innerText = plyerXscore;
    document.getElementById("scoreO").innerText = plyerOscore;
}
updatescore();

for (let i = 0; i < cells.length; i++) {
    cells[i].onclick = function() {
        if (zone[i] === "" && foundw === false) {
            zone[i] = currentplayer;
            cells[i].innerText = currentplayer;
            checkWinner();
            switchPlayer();
        }
    };
}

function switchPlayer() {
    if (currentplayer === "X") currentplayer = "O";
    else currentplayer = "X";
    turn.innerText = "Turn: " + currentplayer;
}

function checkWinner() {
    if (foundw === true) {
    return;
}
    let winner = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let i = 0; i < winner.length; i++) {
        let winwin = winner[i];
        if (zone[winwin[0]] !== "" && zone[winwin[0]] === zone[winwin[1]] && zone[winwin[0]] === zone[winwin[2]]) {
            highlightWinner(winwin[0], winwin[1], winwin[2]);
            mzssage.innerText = "Player " + zone[winwin[0]] + " wins!";
            if (zone[winwin[0]] === "X") plyerXscore += 1;
            else plyerOscore += 1;
            localStorage.setItem("playerXScore", plyerXscore);
            localStorage.setItem("playerOScore", plyerOscore);
            updatescore();
             foundw = true;
            return;
        }
    }

    let tie = true;
    for (let j = 0; j < zone.length; j++) {
        if (zone[j] === "") tie = false;
    }
    if (tie) {
        plyerXscore += 0.5;
        plyerOscore += 0.5;
        localStorage.setItem("playerXScore", plyerXscore);
        localStorage.setItem("playerOScore", plyerOscore);
        updatescore();
        mzssage.innerText = "It's a tie!";
    }
}

function highlightWinner(a, b, c) {
    cells[a].style.color = "gold";
    cells[b].style.color = "gold";
    cells[c].style.color = "gold";
}

function reset() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].className = "cell";
        zone[i] = "";
    }
    currentplayer = "X";
    turn.innerText = "Turn: " + currentplayer;
    mzssage.innerText = "";
      foundw = false; 
}

document.getElementById("reset").onclick = reset;
document.getElementById("resetScore").onclick = function() {
      foundw = false; 
    plyerXscore = 0;
    plyerOscore = 0;
    localStorage.setItem("playerXScore", 0);
    localStorage.setItem("playerOScore", 0);
    updatescore();
    reset();
};
