'use strict'

var gGame
var gBoard
const MINE_IMG = ''
const MINE = `<img class="mine-img" src="img/mine.gif" alt=""></img>`
// getImg(MINE_IMG)


const FLAGGE = '🚩'
const LIVE = '❤️'
const HINT = '💡'
const HINT_OFF = '🪫'

var gTimerInterval = 0
var gBestScore
var gLevel = {
    SIZE: 4,
    MINES: 2,
    MOD: 'easy'
}







var gEmptyCells

function onInit() {
    gBestScore = getBestScore()
    clearInterval(gTimerInterval)  
    setEmptyCells()
    closeGameOver()
    
    setGame()
    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')

}





function onCellClicked(cell, i, j) {

    var cell = gBoard[i][j]
    var elCell = document.querySelector(getSelectorBylocation({ i, j }))

    if (gGame.isManualMode && gGame.countMineMode < gLevel.MINES) {
        cell.isMine = true
        elCell.innerHTML = MINE
        gGame.countMineMode++
        updateManualModeEl()
        if (gGame.countMineMode === gLevel.MINES) {
            elCell.innerHTML = ''
            onManualMode(false)
        }
        return
    }
    if (!gGame.shownCount) {
        gGame.gameStartTime = Date.now()
        gTimerInterval = setInterval(setGameTimer, 1000);
        if(!gGame.isManualMode) setMines(cell, i, j)
        updateMineCount(gBoard)
    }
    if (!gGame.isOn) return
    if (cell.isShown) return
    if (gGame.isHints) {
        hintsMod(i, j)
        var hint = gGame.hintInUsed
        hint.classList.remove('inUsed');
        hint.classList.add('used');
        hint.innerText = HINT_OFF
        gGame.isHints = false
        // gGame.hintInUsed = ''

        return
    }
    if (cell.isMarked) return
    if (cell.isMine) {
        if (gGame.lives) {
            elCell.classList.add('revealed')
            elCell.innerHTML = MINE
            gGame.lives--
            updateLives()
            if (!gGame.lives) {
                setSmiley('😒')
                return gameOver('Oops! You hit a mine')
            }
            setTimeout(hideMine.bind(null, elCell), 1000);
            return
        }
        setSmiley('😒')
        return gameOver('Oops! You hit a mine')
    }
    if (!cell.minesAroundCount) {
        expandShown(gBoard, i, j)
    } else markedIsShown(cell, elCell)

    if (checkGameOver()) {
        setSmiley('😎')
        gameOver('Congratulations! You Won! 🎉')
    }
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
        secsPassed: 0,
        lives: 3,
        hints: 3,
        isHints: false,
        hintInUsed: '',
        gameStartTime: 0,
        onSafeclick: false,
        safeclicks: 3,
        isManualMode: false,
        countMineMode: 0
    }

    setSmiley()
    updateLives()
    updateHints()
    updateBestScore()
    updateSafeClicks()
    restartTimer()
    document.querySelector('.manual-mode-count').innerText = ''
}



function gameOver(TEXT) {

    gGame.isOn = false
    document.querySelector('.game-over span').innerText = TEXT
    document.querySelector('.game-over').style.display = 'block'
    saveBestScore(Math.floor((Date.now() - gGame.gameStartTime)/1000))
    gGame.gameStartTime = 0
    restartTimer()
    clearInterval(gTimerInterval)     
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            var selector = getSelectorBylocation({ i, j })
            var elCell = document.querySelector(selector)
            if (cell.isMine) {
                
                
                cell.isShown = true
                elCell.classList.add('revealed')
                elCell.innerHTML = MINE
            } 
            
        }
        
    }

}



function closeGameOver() {
    const gameOverDiv = document.querySelector('.game-over');
    gameOverDiv.style.display = 'none';

}



function setEmptyCells() {
    gEmptyCells = gLevel.SIZE * gLevel.SIZE - gLevel.MINES
}



function checkGameOver() {
    if (gEmptyCells === gGame.shownCount &&
        gLevel.MINES === gGame.markedCount) return true
    return false
}




function setGameTimer() {
    
    const timeDiff = Date.now() - gGame.gameStartTime;
    const totalSeconds = Math.floor(timeDiff / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;


    document.querySelector('.timer-smiley-container .game-timer').innerText = formattedTime
    return seconds
      
}


function restartTimer(){
    
    
    document.querySelector('.timer-smiley-container .game-timer').innerText = 0

}