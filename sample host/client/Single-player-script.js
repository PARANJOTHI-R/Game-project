/*let currentPlayer = ''; 
let playerSymbol = '';
let aiSymbol = '';*/
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = {
    player: 0,
    ai: 0,
    draw: 0
};
let winningSound;
function initializeGame() {
    const choice = prompt("Do you want to play as X or Ook66yk6?").toUpperCase();
    if (choice === 'X') {
        playerSymbol = 'X';
        aiSymbol = 'O';
        currentPlayer = 'X';
        document.getElementById('status').textContent = 'Your turn (X)';
    } else if (choice === 'O') {
        
        playerSymbol = 'O';
        aiSymbol = 'X';
        currentPlayer = 'O'; 
        document.getElementById('status').textContent = 'Your turn (O)';
    } else {
        alert("Invalid choice. You will play as X.");
        playerSymbol = 'X';
        aiSymbol = 'O';
        currentPlayer = 'X';
        document.getElementById('status').textContent = 'Your turn (X)';
    }
    createBoard();
    winningSound = document.getElementById('winning-sound');
}

function createBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}  
function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (gameBoard[index] !== '' || !gameActive || currentPlayer === aiSymbol) return;
    makeMove(index, playerSymbol);
    if (checkWin()) {
        document.getElementById('status').textContent = 'You win!';
        scores.player++;
        document.getElementById('player-score').textContent = scores.player;
        gameActive = false;
        if (winningSound) {
            winningSound.play();
        }
        return;
    }
    if (checkDraw()) {
        document.getElementById('status').textContent = 'Draw!';
        scores.draw++;
        document.getElementById('draw-score').textContent = scores.draw;
        gameActive = false;
        return;
    }
    currentPlayer = aiSymbol;
    document.getElementById('status').textContent = "AI's turn...";

    setTimeout(aiMove, 500);
}
function aiMove() {
    if (!gameActive) return;
    let move = findWinningMove(aiSymbol);
    if (move === null) {
        move = findWinningMove(playerSymbol);
        if (move === null) {
            const emptyCells = gameBoard
                .map((cell, index) => cell === '' ? index : null)
                .filter(cell => cell !== null);
            move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }
    }
    if (move !== null) {
        makeMove(move, aiSymbol);
        if (checkWin()) {
            document.getElementById('status').textContent = 'AI wins!';
            scores.ai++;
            document.getElementById('ai-score').textContent = scores.ai;
            gameActive = false;
            if (winningSound) {
                winningSound.play();
            }
            return;
        } 
        if (checkDraw()) {
            document.getElementById('status').textContent = 'Draw!';
            scores.draw++;
            document.getElementById('draw-score').textContent = scores.draw;
            gameActive = false;
            return;
        }

        currentPlayer = playerSymbol;
        document.getElementById('status').textContent = `Your turn (${playerSymbol})`;
    }
}

function findWinningMove(player) {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === '') return c;
        if (gameBoard[a] === player && gameBoard[c] === player && gameBoard[b] === '') return b;
        if (gameBoard[b] === player && gameBoard[c] === player && gameBoard[a] === '') return a;
    }
    return null;
}

function makeMove(index, player) {
    gameBoard[index] = player;
    document.querySelectorAll('.cell')[index].textContent = player;
}

function checkWin() {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            highlightWinner(combo);
            return true;
        }
    }
    return false;
}

function highlightWinner(combo) {
    combo.forEach(index => {
        document.querySelectorAll('.cell')[index].classList.add('winning-cell');
    });
}

function checkDraw() {
    return !gameBoard.includes('');
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = playerSymbol === 'X' ? 'X' : 'O'; 
    gameActive = true;
    document.getElementById('status').textContent = `Your turn (${playerSymbol})`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
}   
document.addEventListener('DOMContentLoaded', () => {
    initializeGame(); 
    VANTA.BIRDS({
        el: "#vanta-background",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0xc6dadb,
        birdSize: 1.70,
        wingSpan: 28.00,
        separation: 23.00
    });
    document.querySelector('.sound-button').addEventListener('click', () => {
        const audio = document.getElementById('sound-effect');
        audio.play();
        document.location.href = 'html-bird.html';
    });
});