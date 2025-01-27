
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
    for (var i = 0; i < gGame.hints ; i++) {
     hintHTML += `<span onclick="useHint(this)" class="hint">💡</span> `
    }
    document.querySelector('.hints-container').innerHTML = hintHTML
}


function useHint(hint) {
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
            elCell.innerHTML = ''
        }
    }
    var hint = gGame.hintInUsed
    hint.classList.remove('inUsed');
    hint.classList.add('used');
    gGame.isHints = false
    gGame.hintInUsed = ''
}

