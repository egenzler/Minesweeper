'use strict'

var gGame
var gBoard
const MINE_IMG = ''
const MINE = `<img class="mine-img" src="img/mine.gif" alt=""></img>`
// getImg(MINE_IMG)

//  '💣'
const FLAGGE = '🚩'

var gLevel = {
    SIZE: 4,
    MINES: 2
}





var gEmtiyCells

function onInit() {

    setEmtiyCells()
    closeGameOver()
    setGame()
    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')
    
}




function onCellClicked(cell, i, j) {

    var cell = gBoard[i][j]
    var elCell = document.querySelector(getSelectorBylocation({ i, j }))

    if (!gGame.shownCount) setMines()
    if (!gGame.shownCount) updateMineCount(gBoard)
    if (!gGame.isOn) return console.log('המשחק נגמר');
    if (cell.isMarked) return
    if (cell.isShown) return
    if (cell.isMine) return gameOver()
    if (!cell.minesAroundCount) {
        expandShown(gBoard, elCell, i, j)
    } else markedIsShown(cell, elCell)

}

function markedIsShown(cell, elCell) {
    cell.isShown = true
    gGame.shownCount++
    elCell.classList.add('revealed')
    elCell.innerHTML = +cell.minesAroundCount
}

function buildBoard() {
    const board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])

        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }

        }
    }
    // board[1][3].isMine = board[2][0].isMine = true
    return board
}


function setGame() {
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
}


function gameOver() {
    console.log('נכשלתי');
    gGame.isOn = false
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            var selector = getSelectorBylocation({ i, j })
            var elCell = document.querySelector(selector)
            if (cell.isMine) {
                cell.isShown = true
                elCell.classList.add('revealed')
                elCell.innerHTML = MINE
                document.querySelector('.game-over span').innerText = 'וואו הפסדת'
                document.querySelector('.game-over').style.display = 'block'
            }
        }

    }

}


function closeGameOver() {
    const gameOverDiv = document.querySelector('.game-over');
    gameOverDiv.style.display = 'none';

}


// function gameOver(text) {
//     console.log('Game Over')
//     document.querySelector('.game-over span').innerText = 'וואו ניצחת'
//     document.querySelector('.game-over').style.display = 'block'
//    gGame.isOn = false
//     // if (gGame.score > gBestScore) gBestScore = gGame.score
//     // saveBestScore(gBestScore)
//     // document.querySelector('h3 span').innerText = gBestScore

// }



function setEmtiyCells() {
    gEmtiyCells = gLevel.SIZE * gLevel.SIZE - gLevel.MINES
}








