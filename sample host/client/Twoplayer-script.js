let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;
        let scores = {
            playerX: 0,
            playerO: 0,
            draw: 0
          };
let winningSound;
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
            
            if (gameBoard[index] !== '' || !gameActive) return;

            makeMove(index, currentPlayer);
            
            if (checkWin()) {
                document.getElementById('status').textContent = `Player ${currentPlayer} wins!`;
                if (currentPlayer === 'X') {
                  scores.playerX++;
                  document.getElementById('player-x-score').textContent = scores.playerX;
                  if(winning){
                    winning.play();
                  }
                } else {
                  scores.playerO++;
                  document.getElementById('player-o-score').textContent = scores.playerO;
                  if(winning){
                    winning.play();
                  }
                }
                gameActive = false;
                return;
              }
            
              if (checkDraw()) {
                document.getElementById('status').textContent = 'Draw!';
                scores.draw++;
                document.getElementById('draw-score').textContent = scores.draw;
                gameActive = false;
                return;
              }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
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
            currentPlayer = 'X';
            gameActive = true;
            document.getElementById('status').textContent = "Player X's turn";
            document.querySelectorAll('.cell').forEach(cell => {
              cell.textContent = '';
              cell.classList.remove('winning-cell');
            });
          }

        createBoard();

        document.addEventListener('DOMContentLoaded', () => {


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