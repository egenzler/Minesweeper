
var gChacsContainer = []



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


for (var i = 0; i <= gChacsContainer.length; i++) {


    function expandShown(board, rowIdx, colIdx) {

        gChacsContainer.push({ i: rowIdx, j: colIdx })
        while (gChacsContainer.length > 0) {
            var cellToChech = gChacsContainer.splice(gChacsContainer.length - 1, 1)
            rowIdx = cellToChech[0].i
            colIdx = cellToChech[0].j

            expandShownCell(board, rowIdx, colIdx)

        }
    }
}



function setExpandShown(cell, i, j) {
    var elCell = document.querySelector(getSelectorBylocation({ i, j }))
    var Count = cell.minesAroundCount

    if (!cell.isShown) gGame.shownCount++
    cell.isShown = true
    elCell.classList.add('revealed')
    elCell.innerHTML = (Count) ? cell.minesAroundCount : ''
    insertInLog(cell,elCell,'Shown')
   

}



function expandShownCell(board, rowIdx, colIdx) {

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var cell = board[i][j]

            if (cell.isMarked || cell.isShown || cell.isMine) continue

            if (!cell.minesAroundCount) {
                var toCheck = {
                    i: i,
                    j: j
                }
                gChacsContainer.push(toCheck)
            }
            setExpandShown(cell, i, j)
        }

    }

}

// function expandShown(board, rowIdx, colIdx) {
//     console.log('expandShown2', rowIdx, colIdx);

//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//         if (i < 0 || i >= board.length) continue
//         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//             if (i === rowIdx && j === colIdx) continue
//             if (j < 0 || j >= board[0].length) continue
//             var cell = board[i][j]

//             if (cell.isShown) continue
//             // if (!cell.minesAroundCount) expandShown(board, i, j)

//             setExpandShown(cell, i, j)

//         }
//     }

// }



function getEmptycells(cell, rowIdx, colIdx) {

    var emptycells = []
    var neighboringCells = getNeighboringCells(gBoard, rowIdx, colIdx)

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cerrCell = gBoard[i][j];
            if (!checkArrays(neighboringCells, i, j)) continue
            if (cerrCell === cell) continue
            emptycells.push({ i, j })
        }
    }

    return emptycells
}


function checkArrays(board, rowIdx, colIdx) {
    for (var i = 0; i < board.length; i++) {
        const cell = board[i];
        // console.log(cell, rowIdx, colIdx);

        if (cell.i === rowIdx && cell.j === colIdx) return false
    }

    return true
}

function setMines(cell, rowIdx, colIdx) {

    var cells = getEmptycells(cell, rowIdx, colIdx)

    for (var d = 0; d < gLevel.MINES; d++) {

        var idxCell = getRandomIntInclusive(0, cells.length - 1)
        var cerrCell = cells.splice(idxCell, 1)
        gBoard[cerrCell[0].i][cerrCell[0].j].isMine = true

    }
}

function hideMine(elCell) {
    elCell.classList.remove('revealed')
    elCell.innerHTML = ''

}





