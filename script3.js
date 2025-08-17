const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

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

function handleClick(e) {
    const index = Array.from(cells).indexOf(e.target);
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `${currentPlayer} wins! 🎉`;
        gameActive = false;
    } else if (!board.includes("")) {
        statusText.textContent = `It's a Draw! 🤝`;
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);

restartGame();
