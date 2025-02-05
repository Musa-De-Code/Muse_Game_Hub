// Game State
let playerScore = 0;
let kanaoScore = 0;
const maxHistory = 10;
const flipHistory = [];

// DOM Elements
const coin = document.getElementById("coin");
const resultDisplay = document.getElementById("result");
const historyList = document.getElementById("historyList");

// Coin Click Handler
coin.addEventListener("click", async () => {
    if (coin.classList.contains("flipping")) return;

    // Start animation
    coin.classList.add("flipping");
    coin.textContent = "";
    coin.style.pointerEvents = "none";

    // Generate result after animation
    setTimeout(() => {
        const isHeads = Math.random() > 0.5;
        const result = isHeads ? "Heads" : "Tails";

        // Update scores
        isHeads ? playerScore++ : kanaoScore++;

        // Update displays
        document.getElementById("playerScore").textContent = `You: ${playerScore}`;
        document.getElementById("kanaoScore").textContent = `Kanao: ${kanaoScore}`;
        resultDisplay.textContent = `Result: ${result}!`;

        // Add to history
        addToHistory(result);
    }, 500);

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset coin
    coin.classList.remove("flipping");
    coin.style.pointerEvents = "auto";
    coin.textContent = "CLICK ME";
});

// Reset Button
document.getElementById("reset").addEventListener("click", () => {
    playerScore = 0;
    kanaoScore = 0;
    flipHistory.length = 0;

    document.getElementById("playerScore").textContent = "You: 0";
    document.getElementById("kanaoScore").textContent = "Kanao: 0";
    resultDisplay.textContent = "";
    historyList.innerHTML = "";
});

// History Management
function addToHistory(result) {
    const timestamp = new Date().toLocaleTimeString();
    const entry = document.createElement("li");
    entry.textContent = `${timestamp} - ${result}`;

    historyList.prepend(entry);

    // Remove oldest entry if over limit
    if (historyList.children.length > maxHistory) {
        historyList.removeChild(historyList.lastChild);
    }
}
