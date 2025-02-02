let fubukiScore = 0;
let tatsumakiScore = 0;

function playGame(playerChoice) {
    const choices = ["rock", "paper", "scissors"];
    const tatsumakiChoice = choices[Math.floor(Math.random() * choices.length)];

    document.getElementById("fubuki-choice").innerText = "Selected: " + playerChoice;
    document.getElementById("tatsumaki-choice").innerText = "Selected: " + tatsumakiChoice;

    let result = checkWinner(playerChoice, tatsumakiChoice);

    if (result === "win") {
        fubukiScore++;
    } else if (result === "lose") {
        tatsumakiScore++;
    }

    document.getElementById("fubuki-score").innerText = fubukiScore;
    document.getElementById("tatsumaki-score").innerText = tatsumakiScore;
}

function checkWinner(player, opponent) {
    if (player === opponent) return "draw";
    if ((player === "rock" && opponent === "scissors") ||
        (player === "paper" && opponent === "rock") ||
        (player === "scissors" && opponent === "paper")) {
        return "win";
    } else {
        return "lose";
    }
}

function resetGame() {
    fubukiScore = 0;
    tatsumakiScore = 0;
    document.getElementById("fubuki-score").innerText = fubukiScore;
    document.getElementById("tatsumaki-score").innerText = tatsumakiScore;
    document.getElementById("fubuki-choice").innerText = "Waiting...";
    document.getElementById("tatsumaki-choice").innerText = "Waiting...";
}