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



// function emptyCell(board) {
//     var emptyBoard = []
//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board[0].length; j++) {
//             var cell = { i, j }
//             if (board[i][j] === EMPTY) emptyBoard.push(cell)
//         }

//     }
//     return emptyBoard
// }


function getSelectorBylocation(location) {
    const selector = `.cell-${location.i}-${location.j}`
    return selector
}



function getImg(img) {
    console.log(`<img src="${img}" alt=""></img>` );
    
   return `<img src="${img}" alt=""></img>`
}

// function saveBestScore(score) {
//     localStorage.setItem('bestScore', score);
// }


// function getBestScore() {
//     return localStorage.getItem('bestScore') || 0; // מחזיר 0 אם אין ערך שמור
// }

 
function onCellMarked(elCell,i,j,event) {
    event.preventDefault();
    if (event.button === 2 || event.type === 'contextmenu') {
    var cell = gBoard[i][j]
    cell.isMarked = true
    // var elCell = document.querySelector(getSelectorBylocation({ i, j }))
    gGame.markedCount++
    elCell.innerHTML = FLAGGE
       
    } return
}



