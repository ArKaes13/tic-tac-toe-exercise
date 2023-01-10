// Initial Variables
const initVariables = function() {
    var board = new Array(9);
    var player = 'X';
    var ai = 'O';
    var currentPlayer = 'X';
    var currentRound = 0;
    var gameOver = false;
    var winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    return {board, player, ai, currentPlayer, currentRound, gameOver, winConditions}
}();

// Add Event Listener to each box and the restart button
const addListeners = function() {
    const boxes = document.querySelectorAll('.box');
    const restartButton = document.querySelector('.restart-btn');

    for (box of boxes) {
        box.addEventListener('click', (event) => {
            if (event.target.textContent == '') {
                event.target.textContent = initVariables.currentPlayer;
                addToBoard(getIndexOfChild(event));
                checkForWinner();
                increaseRound();
                switchPlayers();
            }
        })
    }

    restartButton.addEventListener('click', (event) => {
        restartGame();
    })
}();

// Adds an 'X' or an 'O' to the board array
const addToBoard = function(index) {
    initVariables.board[index] = initVariables.currentPlayer;
    console.log(initVariables.board)
}

// Gets the index number of the child element that was targeted
const getIndexOfChild = function(event) {
    const parent = event.target.parentElement;
    const indexNumber = Array.prototype.indexOf.call(parent.children, event.target)
    return indexNumber;
}

// Switches players after their turn
const switchPlayers = function() {
    if (initVariables.currentPlayer === initVariables.player) {
        initVariables.currentPlayer = initVariables.ai;
    } else {
        initVariables.currentPlayer = initVariables.player;
    }
}

const increaseRound = function() {
    initVariables.currentRound++;
}

const checkForWinner = function() {
    for (condition of initVariables.winConditions) {
        if (initVariables.board[condition[0]] === initVariables.currentPlayer &&
            initVariables.board[condition[1]] === initVariables.currentPlayer &&
            initVariables.board[condition[2]] === initVariables.currentPlayer
        ) {
            initVariables.gameOver = true;
            break;
        }
    }
}

const restartGame = function () {
    const boxes = document.querySelectorAll('.box');
    initVariables.currentPlayer = 'X';
    initVariables.gameOver = false;

    for (i = 0; i < initVariables.board.length; i++) {
        boxes[i].textContent = '';
        initVariables.board[i] = null;
    }
}

