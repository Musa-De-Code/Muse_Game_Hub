const columns = 7;
const rows = 6;
let board = [];
let currentPlayer = "red"; // "red" (Fubuki) or "yellow" (Kitagawa)
let gameActive = true;
let scores = { red: 0, yellow: 0 }; // Score tracker

// Initialize the board as a 6x7 grid
function initializeBoard() {
    board = Array(rows).fill(null).map(() => Array(columns).fill(null));
    renderBoard();
    gameActive = true;
    currentPlayer = "red"; // Reset to Alya
    document.getElementById("message").textContent = "Fubuki's Turn (🔴)";
}

// Render the board dynamically
function renderBoard() {
    const boardContainer = document.querySelector(".board");
    boardContainer.innerHTML = "";

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;

            if (board[row][col] === "red") {
                cell.classList.add("red");
            } else if (board[row][col] === "yellow") {
                cell.classList.add("yellow");
            }

            cell.addEventListener("click", () => dropPiece(col));
            boardContainer.appendChild(cell);
        }
    }
}

// Drop a piece into the column
function dropPiece(col) {
    if (!gameActive) return;

    for (let row = rows - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            renderBoard();
            if (checkWinner(row, col)) {
                scores[currentPlayer]++; // Update the score
                document.getElementById("message").textContent = `${currentPlayer === "red" ? "Fubuki" : "Kitawaga"} Wins! 🎉`;
                updateScore();
                gameActive = false;
                return;
            }
            currentPlayer = currentPlayer === "red" ? "yellow" : "red";
            document.getElementById("message").textContent = `${currentPlayer === "red" ? "Fubuki" : "Kitagawa"}'s Turn (${currentPlayer === "red" ? "🔴" : "🟡"})`;
            return;
        }
    }
}

// Check if the current player won
function checkWinner(row, col) {
    return (
        checkDirection(row, col, 1, 0) || // Vertical
        checkDirection(row, col, 0, 1) || // Horizontal
        checkDirection(row, col, 1, 1) || // Diagonal ↘
        checkDirection(row, col, 1, -1)   // Diagonal ↙
    );
}

// Check in a specific direction
function checkDirection(row, col, rowIncrement, colIncrement) {
    let color = board[row][col];
    let count = 1;

    for (let i = 1; i < 4; i++) {
        let newRow = row + i * rowIncrement;
        let newCol = col + i * colIncrement;
        if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= columns || board[newRow][newCol] !== color) {
            break;
        }
        count++;
    }

    for (let i = 1; i < 4; i++) {
        let newRow = row - i * rowIncrement;
        let newCol = col - i * colIncrement;
        if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= columns || board[newRow][newCol] !== color) {
            break;
        }
        count++;
    }

    return count >= 4;
}

// Update Score Display
function updateScore() {
    document.getElementById("alya-score").textContent = scores.red;
    document.getElementById("kuze-score").textContent = scores.yellow;
}

// Reset the board for a new game but keep the score
function newGame() {
    initializeBoard();
}

// Reset everything including the score
function resetGame() {
    scores = { red: 0, yellow: 0 }; // Reset scores
    updateScore();
    initializeBoard();
}

// Initialize the game on page load
window.onload = () => {
    initializeBoard();
    updateScore();
};
