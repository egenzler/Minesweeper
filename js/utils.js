'use strict'


// ${(cell.isMine) ? MINE : ''}

function renderBoard(mat, selector) {

    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td onclick="onCellClicked(this,${i},${j})" 
             onmousedown="onCellMarked(this,${i},${j},event)"
             class="${className}">
            </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}
// cell-0-0

function getElcellFromClassName(Class) {
    return { i, j }
}

function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value

}



function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getEmptySafecell(board) {
    var cells = emptySafeCells(board)
    var idx = getRandomIntInclusive(0, cells.length)
    var cell = cells[idx]
    return cell
}


function emptySafeCells(board) {
    var emptySafeBoard = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var emptyCell = { i, j }
            var cell = board[i][j]
            if (cell.isMine || cell.isShown) continue
            emptySafeBoard.push(emptyCell)
        }
        
    }
    // console.log(emptySafeBoard);
    return emptySafeBoard
}


function getSelectorBylocation(location) {
    const selector = `.cell-${location.i}-${location.j}`
    return selector
}

function getElcellByLocation(location){
    var selector = getSelectorBylocation(location)
    var elCell = document.querySelector(selector)
return elCell

}



function getImg(img) {
    console.log(`<img src="${img}" alt=""></img>`);

    return `<img src="${img}" alt=""></img>`
}

function saveBestScore(score) {
    console.log('gBestScore', gBestScore, 'score', score);

    if (gBestScore === 0 || score < gBestScore) {
        gBestScore = score
        var bestScore = `bestScore-${gLevel.MOD}`
        localStorage.setItem(bestScore, score);
    }
}


function getBestScore() {
    console.log(`bestScore-${gLevel.MOD}`);
    var bestScore = `bestScore${gLevel.MOD}`

    return localStorage.getItem(bestScore) || 0; // מחזיר 0 אם אין ערך שמור
}


function onCellMarked(elCell, i, j, event) {

    const board = document.querySelector('.board-container');
    board.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    if (event.button === 2 || event.type === 'contextmenu') {
        var cell = gBoard[i][j]

        if (cell.isShown) return

        if (cell.isMarked) {
            cell.isMarked = false
            gGame.markedCount--
            elCell.innerHTML = ''

        } else {
            cell.isMarked = true
            gGame.markedCount++
            elCell.innerHTML = FLAGGE
        }
        if (checkGameOver()) return gameOver('ניצחת')
    } return
}



