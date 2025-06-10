const GameBoard = (function () {
    const gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    return {gameBoard};
})();

const Player = function (marker, score, name) {
    this.marker = marker;
    this.score = score;
    this.name = name;
    return{marker, score, name};
}

const Game = (function () {
    const player1 = Player('X', 0, "Player 1");
    const player2 = Player('O', 0, "Player 2");
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
            alert(`${player1.name} Wins!`);
            player1.score++;
            document.querySelector("#p1score").textContent = player1.score;
        }
        else if (Game.checkWinner() == 2){
            alert(`${player2.name} Wins!`);
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
    return {round, checkWinner, reset, player1, player2}
})();

const DisplayLogic = (function () {
    const display = (function () {
        let btnOpen = document.getElementById('modalOpen');
        let dialog = document.getElementById('updateName');
        let btnClose = document.getElementById('modalClose');
        let submit = document.getElementById('submitNames');
        btnOpen.addEventListener("click", () => {
            dialog.showModal();
        })
        btnClose.addEventListener("click", () => {
            dialog.close();
        })
        submit.addEventListener("click", (e) => {
            if (document.getElementById("p1NameForm").value == '' || document.getElementById("p2NameForm").value == ''){
                alert("Please enter values for each name");
            }
            else {
                Game.player1.name = document.getElementById("p1NameForm").value;
                Game.player2.name = document.getElementById("p2NameForm").value;
                document.getElementById("p1Name").textContent = `${Game.player1.name}: `;
                document.getElementById("p2Name").textContent = `${Game.player2.name}: `;
                document.getElementById("p1NameForm").value = '';
                document.getElementById("p2NameForm").value = '';
            }
            e.preventDefault();
        })

    })();
    const playerInput = (function () {
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
                if (square.textContent == '' && btn.textContent == "Reset" && !Game.checkWinner()){
                    square.innerHTML = Game.round(square.classList[0].slice(-1), square.classList[1].slice(-1));
                    if (square.textContent == 'X') {
                        square.style.color = 'red';
                    }
                    else if (square.textContent == 'O') {
                        square.style.color = 'blue';
                    }
                }
                if (Game.checkWinner()){
                    Game.reset();
                    btn.textContent = 'Reset ';
                }
            })
            square.addEventListener("mouseover", (e) => {
                square.style.backgroundColor = "lightgray";
            })
            square.addEventListener("mouseout", (e) => {
                square.style.backgroundColor = "white";
            })
        }
    })();
})();