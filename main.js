'use strict'
const Gameboard = (() => {
    const gridSpace = document.querySelector(".game_board");
    let game_board = ["", "", "", "", "", "", "", "", ""];
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

    const display = (winnerCombination) => {
        for (let i = 0; i < game_board.length; i++) {
            const tile = document.createElement("div");
            tile.setAttribute("data-id", i);
            tile.textContent = game_board[i];
            if (winnerCombination) {
                if (i === winnerCombination[0] ||
                    i === winnerCombination[1] ||
                    i === winnerCombination[2]) {
                     tile.style.backgroundColor = "#ca363649";                    }
            }
            gridSpace.appendChild(tile);
        }
    }

    const resetDisplay = () => {
        while (gridSpace.firstChild) {
            gridSpace.firstChild.remove();
        }
    }

    const winner = () => {
        for (let i = 0; i < winningConditions.length; i++){
            const winCondition = winningConditions[i];
            let a = game_board[winCondition[0]];
            let b = game_board[winCondition[1]];
            let c = game_board[winCondition[2]];

            if (a === b && a === c && a !== "") {
                alert( ` ${a} won :)`);

                for (let i = 0; i < 9; i++){
                    if (game_board[i] === "") {
                        game_board[i] = null;
                    }
                }
                return winCondition;
            }
        }
    }

    return {
        game_board,
        gridSpace,
        display,
        resetDisplay,
        winner,
    }
})();
const Player = (emoji) => {
    const icon = emoji ;
    
    return {
        icon,
    }
}

const Game = (() => {

    const resetButton = document.querySelector("#reset_board");
    let turn = true;
    let turnCount = 0;

    const play = (player1, player2) => {
        Gameboard.gridSpace.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            if (Gameboard.game_board[id] === "") {
                if (turn === true) {
                    Gameboard.game_board[id] = player1.icon;
                    turnCount++;
                    turn = !turn;
                }
                else {
                    Gameboard.game_board[id] = player2.icon;
                    turn = !turn;
                    turnCount++;
                }

                const winnerCombination = Gameboard.winner();

                if (turnCount === 9 && !winnerCombination) {
                    alert( "It's a tie") ; 
                }
                Gameboard.resetDisplay();
                Gameboard.display(winnerCombination);
            }
        });

    }

    const resetGame = () => {
        resetButton.addEventListener("click", () => {
            for (let i = 0; i < 9; i++){
                Gameboard.game_board[i] = "";
            }
            turnCount = 0;
            Gameboard.resetDisplay();
            Gameboard.display();
        })
    }

    return {
        play,
        resetGame,
    }

})();

const main = (() => {
    const play = () => {
        const player1 = Player("X");
        const player2 = Player("O");
        Game.play(player1, player2);
        Gameboard.display();
        Game.resetGame();
    }
    return {
        play,
    }
    
})();

main.play();