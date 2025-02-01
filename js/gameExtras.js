
function smileyOnInit() {
    onInit()
    setSmiley('😊')
    setTimeout(setSmiley, 150);
}

function setSmiley(value = '😉') {
    document.querySelector('.smiley span').innerText = value
}

function updateLives() {
    document.querySelector('.lives span').innerText = LIVE.repeat(gGame.lives)
  
}

function updateHints() {
    var hintHTML = 'hints: '
    for (var i = 0; i < gGame.hints; i++) {
        hintHTML += `<span onclick="useHint(this)" class="hint">💡</span> `
    }
    document.querySelector('.hints-container').innerHTML = hintHTML
}


function updateBestScore() {
    document.querySelector('.bestScore span').innerText = gBestScore
}

function updateSafeClicks() {

    document.querySelector('.safe-clicks-container span').innerText = gGame.safeclicks

}

function useHint(hint) {
    console.log(hint);

    if (!hint.classList.contains('used')) {
        gGame.isHints = true
        gGame.hintInUsed = hint
        gGame.hints--

        hint.classList.add('inUsed');
    }
}


function hintsMod(rowIdx, colIdx) {
    setTimeout(hideHintsMod.bind(null, rowIdx, colIdx), 1000);
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            var cell = gBoard[i][j]
            if (cell.isShown) continue
            var elCell = document.querySelector(getSelectorBylocation({ i, j }))
            elCell.classList.add('revealed')
            if (cell.minesAroundCount) {
                elCell.innerHTML = cell.minesAroundCount
            } else if (cell.isMine) {
                elCell.innerHTML = MINE
            }
        }
    }
}

function hideHintsMod(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            var cell = gBoard[i][j]
            if (cell.isShown) continue
            var elCell = document.querySelector(getSelectorBylocation({ i, j }))
            elCell.classList.remove('revealed')
            if (cell.isMarked) elCell.innerHTML = FLAGGE
            else elCell.innerHTML = ''

        }
    }
    var hint = gGame.hintInUsed
    hint.classList.remove('inUsed');
    hint.classList.add('used');
    gGame.isHints = false
    // gGame.hintInUsed = ''
}


function getNeighboringCells(board, rowIdx, colIdx) {
    var emptyCells = []

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var idxCell = ({ i, j })
            emptyCells.push(idxCell)
        }
    }
    return emptyCells
}


function onSafeclick() {
    if (!gGame.safeclicks) return
    gGame.onSafeclick = true
    gGame.safeclicks--
    
    document.querySelector('.safe-clicks-count').innerText = gGame.safeclicks

    gGame.onSafeclick = false

    var idx = getEmptySafecell(gBoard)
    var elCell = getElcellByLocation(idx)

    elCell.classList.add("safe-clicked")
    setTimeout(() => {
        elCell.classList.remove("safe-clicked");
    }, 3000)
    return

}



function updateManualModeEl(){
    document.querySelector('.manual-mode-count').innerText = `${gLevel.MINES}(${gGame.countMineMode})`
}
function onManualMode(shouldAddOrRemoveClass = true) {

    if (gGame.shownCount) return
    updateManualModeEl()
    gGame.isManualMode = true
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var location = { i, j }
            var elCell = getElcellByLocation(location)
            if(shouldAddOrRemoveClass) {
                elCell.classList.add('revealed')
            } else {
                elCell.classList.remove('revealed')
                elCell.innerText = ''

            }
        }

    }
}


