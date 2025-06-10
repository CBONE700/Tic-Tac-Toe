const GameBoard = (function () {
    const gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    return {gameBoard};
})();

const Player = function (marker, score) {
    this.marker = marker;
    this.score = score
    return{marker, score};
}

const DisplayLogic = (function () {
    const display = function () {
        const body = document.body;
        body.innerHTML = `
        <div class="score"><div id="p1score">0</div><div id="p2score">0</div></div>
        <div class="gameBoard">
            <div class="row0 col0"></div><div class="row0 col1"></div><div class="row0 col2"></div>
            <div class="row1 col0"></div><div class="row1 col1"></div><div class="row1 col2"></div>
            <div class="row2 col0"></div><div class="row2 col1"></div><div class="row2 col2"></div>
        </div>
        <div><button id="start">Start</button></div>`
    };
    const playerInput = function () {
        const btn = document.querySelector("#start");
        const squares = document.querySelector(".gameBoard").children;
        btn.addEventListener("click", () => {
            for (let square of squares){
                square.textContent = '';
            }
            if (btn.textContent == 'Start'){
                btn.textContent = 'Reset';
                }
            else {
                Game.reset();
                btn.textContent = 'Start';
            }
        })
        for (let square of squares){
            square.addEventListener("click", () => {
                if (square.textContent == '' && btn.textContent != "Start"){
                    square.innerHTML = Game.round(square.classList[0].slice(-1), square.classList[1].slice(-1));
                    if (square.textContent == 'X') {
                        square.style.color = 'red';
                    }
                    else if (square.textContent == 'O') {
                        square.style.color = 'blue';
                    }
                }
                if (Game.checkWinner()){
                    btn.textContent = 'Start';
                    Game.reset();
                }
            })
        }
    }
    return {display, playerInput};
})();

const Game = (function () {
    const player1 = Player('X', 0);
    const player2 = Player('O', 0);
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
                return 1;
            }
        else if (GameBoard.gameBoard[0][0] == 'O' && GameBoard.gameBoard[0][1] == 'O' && GameBoard.gameBoard[0][2] == 'O' ||
            GameBoard.gameBoard[1][0] == 'O' && GameBoard.gameBoard[1][1] == 'O' && GameBoard.gameBoard[1][2] == 'O' ||
            GameBoard.gameBoard[2][0] == 'O' && GameBoard.gameBoard[2][1] == 'O' && GameBoard.gameBoard[2][2] == 'O' ||
            GameBoard.gameBoard[0][0] == 'O' && GameBoard.gameBoard[1][0] == 'O' && GameBoard.gameBoard[2][0] == 'O' ||
            GameBoard.gameBoard[0][1] == 'O' && GameBoard.gameBoard[1][1] == 'O' && GameBoard.gameBoard[2][1] == 'O' ||
            GameBoard.gameBoard[0][2] == 'O' && GameBoard.gameBoard[1][2] == 'O' && GameBoard.gameBoard[2][2] == 'O' ||
            GameBoard.gameBoard[0][0] == 'O' && GameBoard.gameBoard[1][1] == 'O' && GameBoard.gameBoard[2][2] == 'O' ||
            GameBoard.gameBoard[0][2] == 'O' && GameBoard.gameBoard[1][1] == 'O' && GameBoard.gameBoard[2][0] == 'O') {
                return 2;
            }
        else if (rounds == 9){
            return 3;
        }
    }
    const reset = function (){
        if (Game.checkWinner() == 1){
            alert("Player 1 Wins!");
            player1.score++;
            document.querySelector("#p1score").textContent = player1.score;
        }
        else if (Game.checkWinner() == 2){
            alert("Player 2 Wins!");
            player2.score++;
            document.querySelector("#p2score").textContent = player2.score;
        }
        else if (Game.checkWinner() == 3){
            alert("Draw!");
        }
        rounds = 0;
        turn = 1;
        GameBoard.gameBoard.forEach(item => item.fill(0));
    }
    const play = (function (){
        DisplayLogic.display();
        DisplayLogic.playerInput();
    })();
    return {round, checkWinner, reset}
})();