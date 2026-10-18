document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll("#board div");
    const statusDiv = document.getElementById("status");
    const resetButton = document.querySelector(".btn");

    let currentPlayer = "X";
    let gameState = Array(9).fill("");
    let gameActive = true;

    // Exercise 1: Layout the board
    squares.forEach((square, index) => {
        square.classList.add("square");

        // Exercise 2: Add X or O when clicked & Exercise 6: Disallow Cheating
        square.addEventListener("click", () => {
            if (!gameActive || gameState[index] !== "") return;

            gameState[index] = currentPlayer;
            square.textContent = currentPlayer;
            square.classList.add(currentPlayer);

            checkWinner();

            if (gameActive) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        });

        // Exercise 3: Change style on mouseover / mouseout
        square.addEventListener("mouseover", () => {
            if (gameState[index] === "" && gameActive) {
                square.classList.add("hover");
            }
        });

        square.addEventListener("mouseout", () => {
            square.classList.remove("hover");
        });
    });

    // Exercise 4: Check for the winner
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]            // Diagonals
        ];

        let roundWon = false;
        for (let condition of winningCombinations) {
            let [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDiv.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
            statusDiv.classList.add("you-won");
            gameActive = false;
        }
    }

    // Exercise 5: Restart the game
    resetButton.addEventListener("click", () => {
        gameState = Array(9).fill("");
        gameActive = true;
        currentPlayer = "X";
        statusDiv.textContent = "Move your mouse over a square and click to play an X or an O.";
        statusDiv.classList.remove("you-won");

        squares.forEach(square => {
            square.textContent = "";
            square.classList.remove("X", "O", "hover");
        });
    });
});