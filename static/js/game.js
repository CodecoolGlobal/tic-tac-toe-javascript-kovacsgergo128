

function createSignObject(player) {
    let sign = player['sign'];
    const playerSign = document.createElement('img');
    playerSign.classList.add('img-fluid', 'sign-position');
    playerSign.setAttribute('src', sign);
    return playerSign;
}

function insertSign(clickedGameCell, player) {
    let playerSign = createSignObject(player);
    clickedGameCell.appendChild(playerSign);
    clickedGameCell.setAttribute('data-player', player['id']);
}

function addEventListenerToGameCells(player1, player2, winningTable) {
    let gameCells = document.querySelectorAll('.game-cell');
    let nextPlayer = player1;
    let turn = 0;

    for (let gameCell of gameCells) {
        gameCell.addEventListener('click', function eventHandler(event) {
            let clickedGameCell = event.currentTarget;
            if (clickedGameCell.innerHTML === '') {
                if (nextPlayer.id === 1) {
                    turn++
                }
                insertSign(clickedGameCell, nextPlayer);
                nextPlayer = setNextPlayer(nextPlayer, player1, player2);
                checkGameStatus(winningTable);
            }

        });
    }
}

function setNextPlayer(nextPlayer, player1, player2) {
    if (nextPlayer['id'] === 1) {
        nextPlayer = player2;
    } else {
        nextPlayer = player1;
    }
    return nextPlayer;
}

function tryAgain() {
    // set everything in starting position
}

function checkGameStatus(winningTable) {  // should be divided into two functions -> getCellsByPlayer and checkWinningConditions
    let gameCells = document.querySelectorAll('.game-cell');
    let player1Cells = [];
    let player2Cells = [];
    let emptyCells = [];
    for (let gameCell of gameCells) {
        let player = gameCell.dataset.player;
        let coordinates = [parseInt(gameCell.dataset.coordinateX), parseInt(gameCell.dataset.coordinateY)];
        if (player === '1') {
            player1Cells.push(String(coordinates));
        } else if (player === '2') {
            player2Cells.push(String(coordinates));
        } else {
            emptyCells.push(String(coordinates));
        }
    }
    for (let winningSets of winningTable) {
        if (_.every(winningSets, function (winCoord) {
            return player1Cells.includes(winCoord)
        })) {
            console.log('player1 win')
        }
        else if (_.every(winningSets, function (winCoord) {
            return player2Cells.includes(winCoord)
        })) {
            console.log('player2 win')
        }
    }
    if (emptyCells.length === 0) {
        console.log("tie")
    }
}

function createModal(result) {

}

function getWinningOptions() {
    let gameBoard = document.getElementById('game-board');
    let rows = parseInt(gameBoard.dataset.rowNum);
    let cols = parseInt(gameBoard.dataset.colNum);
    let winSize = parseInt(gameBoard.dataset.winSize);
    let winningOptions = [];


    for (let y = 0; y < rows; y++) {
        for (let x = 0; x <= cols - winSize; x++){
             let horizontalWinningOption = [];
             for (let i = 0; i < winSize; i++) {
                 horizontalWinningOption.push(String([x + i, y]));
             }
             winningOptions.push(horizontalWinningOption);
        }
    }
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y <= rows - winSize; y++) {
            let verticalWinningOption = [];
            for (let i = 0; i < winSize; i++) {
                verticalWinningOption.push(String([x, y + i]));
            }
            winningOptions.push(verticalWinningOption);
        }
    }
    for (let y = 0; y <= rows - winSize; y++) {
        for (let x = 0; x <= cols - winSize; x++) {
            let upDownDiagonalWinOpts = [];
            for (let i = 0; i < winSize; i++) {
                upDownDiagonalWinOpts.push(String([x + i, y + i]));
            }
            winningOptions.push(upDownDiagonalWinOpts);
        }
    }
    for (let y = rows; y >= winSize; y--) {
        for (let x = 0; x <= cols - winSize; x++ ) {
            let downUpDiagonalWinOpts = [];
            for (let i = 0; i < winSize; i++) {
                downUpDiagonalWinOpts.push(String([x + i, y - i]));
            }
            winningOptions.push(downUpDiagonalWinOpts);
        }
    }
    console.log(winningOptions);
    return winningOptions;
}
function main() {
    let player1 = {id: 1, name: 'player_1', status: 'human', sign: '/static/images/green_cross.png'};
    let player2 = {id: 2, name: 'player_2', status: 'human', sign: '/static/images/red_circle.png'};
    const winningTable = getWinningOptions();

    addEventListenerToGameCells(player1, player2, winningTable);
}

window.onload = function () {
    main()
};

