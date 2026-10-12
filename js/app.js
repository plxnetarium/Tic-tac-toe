/* The eight groups of three squares that can make a winning line. */
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/* These variables keep track of what is happening in the game. */
let board = ['', '', '', '', '', '', '', '', '']
let turn = 'X'
let winner = false
let tie = false

/* Get the board squares, message, and reset button from the HTML. */
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetButtonEl = document.querySelector('#reset-button')

/* Draw the current game state on the page when the game starts. */
function init() {
    render()
}

/* Update both the squares and the message shown to the player. */
function render() {
    updateBoard()
    updateMessage()
}

/* Put each value from the board array into its matching square. */
function updateBoard() {
    for (let i = 0; i < board.length; i++) {
        squareEls[i].textContent = board[i]
    }
}

/* Show whose turn it is, or show the result if the game has ended. */
function updateMessage() {
    if (winner) {
        // If X is due next, O made the winning move (and vice versa).
        messageEl.textContent = `${turn === 'X' ? 'O' : 'X'} won!`
    } else if (tie) {
        messageEl.textContent = "It's a tie!"
    } else {
        messageEl.textContent = `${turn}'s turn`
    }
}

/* Handle a click on a square and then check whether the game has ended. */
function handleClick(event) {
    // Ignore clicks after a win or tie.
    if (winner || tie) return

    // The square's HTML id tells us its position in the board array.
    const squareIndex = Number(event.target.id)

    // Do not allow a player to overwrite a square that is already filled.
    if (board[squareIndex] !== '') return

    // Place the current player's mark, then look for a win or a tie.
    board[squareIndex] = turn
    checkGameStatus()

    // Switch turns only if the game is still going.
    if (!winner && !tie) {
        turn = turn === 'X' ? 'O' : 'X'
    }

    render()
}

/* Set winner if any winning line is filled by the same mark. */
function checkGameStatus() {
    winner = winningCombos.some(([a, b, c]) =>
        board[a] !== '' && board[a] === board[b] && board[b] === board[c]
    )

    // A tie means every square is filled and no one has won.
    if (!winner && board.every(square => square !== '')) {
        tie = true
    }
}

/* Start a fresh game by clearing the board and restoring the starting values. */
function resetGame() {
    board = ['', '', '', '', '', '', '', '', '']
    turn = 'X'
    winner = false
    tie = false
    render()
}

/* Connect clicks in the page to the functions that handle them. */
squareEls.forEach(square => square.addEventListener('click', handleClick))
resetButtonEl.addEventListener('click', resetGame)

init()
