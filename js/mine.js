
function updateMineCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isMine) continue
            var countMine = countMineAround(board, i, j)
            board[i][j].minesAroundCount = countMine
        }

    }
}

function countMineAround(board, rowIdx, colIdx) {
    var mineCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j].isMine
            if (currCell) mineCount++
        }
    }
    return mineCount
}



function expandShown(board, elCell, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]

            if (currCell.isMarked) continue

            var updateElCell = document.querySelector(getSelectorBylocation({ i, j }))
            var Count = currCell.minesAroundCount

            if (!currCell.isShown) gGame.shownCount++
            currCell.isShown = true
            updateElCell.classList.add('revealed')
            updateElCell.innerHTML = (Count) ? currCell.minesAroundCount : ''

        }
    }

}


function setMines() {
    for (var d = 0; d < gLevel.MINES; d++) {

        var i = getRandomIntInclusive(0, gLevel.SIZE - 1)
        var j = getRandomIntInclusive(0, gLevel.SIZE - 1)
        console.log('i', i);
        console.log('j', j);


        gBoard[i][j].isMine = true

    }
}

function hideMine(elCell) {
    elCell.classList.remove('revealed')
    elCell.innerHTML = ''

}


