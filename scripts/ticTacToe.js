let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let fubukiScore = 0;
let tatsumakiScore = 0;
let gameOver = false;

function makeMove(index) {
    if (board[index] === "" && !gameOver) {
        board[index] = currentPlayer;
        document.getElementsByClassName("cell")[index].innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        document.getElementById("message").innerText = (currentPlayer === "X" ? "Alya's" : "Kuze's") + " Turn";
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combo of winningCombos) {
        let [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById("message").innerText = (currentPlayer === "X" ? "Fubuki" : "Tatsumaki") + " Wins!";
            gameOver = true;

            if (currentPlayer === "X") {
                fubukiScore++;
                document.getElementById("fubuki-score").innerText = fubukiScore;
            } else {
                tatsumakiScore++;
                document.getElementById("tatsumaki-score").innerText = tatsumakiScore;
            }

            // Highlight the winning cells
            document.getElementsByClassName("cell")[a].style.backgroundColor = "green";
            document.getElementsByClassName("cell")[b].style.backgroundColor = "green";
            document.getElementsByClassName("cell")[c].style.backgroundColor = "green";
            return;
        }
    }

    if (!board.includes("")) {
        document.getElementById("message").innerText = "It's a Draw!";
        gameOver = true;
    }
}

function newGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
        cell.style.backgroundColor = "";  // Reset background color
    });
    gameOver = false;
    currentPlayer = "X";
    document.getElementById("message").innerText = "Alya's Turn";
}

function resetGame() {
    fubukiScore = 0;
    tatsumakiScore = 0;
    document.getElementById("fubuki-score").innerText = fubukiScore;
    document.getElementById("tatsumaki-score").innerText = tatsumakiScore;
    newGame();
}
