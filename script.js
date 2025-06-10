const GameBoard = (function () {
    const gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    return {gameBoard};
})();

const Player = function (marker) {
    this.marker = marker;
    return{marker};
}

const DisplayLogic = (function () {
    const display = function () {
        const body = document.body;
        body.innerHTML = `    
        <div class="container">
            <div class="gameBoard">
                <div class="row0 col0"></div><div class="row0 col1"></div><div class="row0 col2"></div>
                <div class="row1 col0"></div><div class="row1 col1"></div><div class="row1 col2"></div>
                <div class="row2 col0"></div><div class="row2 col1"></div><div class="row2 col2"></div>
            </div>
        </div>`
    };
    const playerInput = function () {
        const gameBoard = document.querySelector(".gameBoard");
        const squares = gameBoard.children;
        for (let square of squares){
            square.addEventListener("click", () => {
                if (square.textContent == '' && !Game.checkWinner()){
                    square.innerHTML = Game.round(square.classList[0].slice(-1), square.classList[1].slice(-1));
                }
                if (Game.checkWinner()){
                    alert(Game.checkWinner());
                }
            })
        }
    }
    return {display, playerInput};
})();

DisplayLogic.display();
DisplayLogic.playerInput();

const Game = (function () {
    const player1 = Player('X');
    const player2 = Player('O');
    let turn = 1;
    let rounds = 0;
    const round = function(row, col) {
        if (turn === 1) {
            GameBoard.gameBoard[row][col] = player1.marker;
            turn++;
            rounds++;
            return player1.marker;
        }
        else if (turn === 2) {
            GameBoard.gameBoard[row][col] = player2.marker;
            turn--;
            rounds++;
            return player2.marker;
        }
    }
    const checkWinner = function(){
        if (GameBoard.gameBoard[0][0] == 'X' && GameBoard.gameBoard[0][1] == 'X' && GameBoard.gameBoard[0][2] == 'X' ||
            GameBoard.gameBoard[1][0] == 'X' && GameBoard.gameBoard[1][1] == 'X' && GameBoard.gameBoard[1][2] == 'X' ||
            GameBoard.gameBoard[2][0] == 'X' && GameBoard.gameBoard[2][1] == 'X' && GameBoard.gameBoard[2][2] == 'X' ||
            GameBoard.gameBoard[0][0] == 'X' && GameBoard.gameBoard[1][0] == 'X' && GameBoard.gameBoard[2][0] == 'X' ||
            GameBoard.gameBoard[0][1] == 'X' && GameBoard.gameBoard[1][1] == 'X' && GameBoard.gameBoard[2][1] == 'X' ||
            GameBoard.gameBoard[0][2] == 'X' && GameBoard.gameBoard[1][2] == 'X' && GameBoard.gameBoard[2][2] == 'X' ||
            GameBoard.gameBoard[0][0] == 'X' && GameBoard.gameBoard[1][1] == 'X' && GameBoard.gameBoard[2][2] == 'X' ||
            GameBoard.gameBoard[0][2] == 'X' && GameBoard.gameBoard[1][1] == 'X' && GameBoard.gameBoard[2][0] == 'X') {
                return "Player 1 Wins!";
            }
        else if (GameBoard.gameBoard[0][0] == 'O' && GameBoard.gameBoard[0][1] == 'O' && GameBoard.gameBoard[0][2] == 'O' ||
            GameBoard.gameBoard[1][0] == 'O' && GameBoard.gameBoard[1][1] == 'O' && GameBoard.gameBoard[1][2] == 'O' ||
            GameBoard.gameBoard[2][0] == 'O' && GameBoard.gameBoard[2][1] == 'O' && GameBoard.gameBoard[2][2] == 'O' ||
            GameBoard.gameBoard[0][0] == 'O' && GameBoard.gameBoard[1][0] == 'O' && GameBoard.gameBoard[2][0] == 'O' ||
            GameBoard.gameBoard[0][1] == 'O' && GameBoard.gameBoard[1][1] == 'O' && GameBoard.gameBoard[2][1] == 'O' ||
            GameBoard.gameBoard[0][2] == 'O' && GameBoard.gameBoard[1][2] == 'O' && GameBoard.gameBoard[2][2] == 'O' ||
            GameBoard.gameBoard[0][0] == 'O' && GameBoard.gameBoard[1][1] == 'O' && GameBoard.gameBoard[2][2] == 'O' ||
            GameBoard.gameBoard[0][2] == 'O' && GameBoard.gameBoard[1][1] == 'O' && GameBoard.gameBoard[2][0] == 'O') {
                return "Player 2 Wins!";
            }
        else if (rounds == 9){
            return "Draw!";
        }
    }
    const play = function (){
        DisplayLogic.display();
        DisplayLogic.playerInput();
    }
    return {round, play, checkWinner}
})();

Game.play();