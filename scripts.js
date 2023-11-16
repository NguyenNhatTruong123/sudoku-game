document.addEventListener('contextmenu', event => event.preventDefault());
var grid = document.getElementById("grid")
var difficulty = document.getElementById("difficulty").value;
var gameButton = document.getElementById("gameButton");
var errorCheck = document.getElementById("errorCheck").value;
var errorCheckStatus = document.getElementById("errorCheckStatus");
var tutorial = document.getElementById("tutorial")
var note = document.getElementById("note")

var Board;
var SolveBoard;
var generateBoard
var solveBoard

var activeCell = ""
var activeRow = 0
var activeCol = 0

var isNote = false
var errorCount = 0

tutorial.innerText = " Dùng chuột để chọn vào ô cần nhập số, hoặc dùng các phím di chuyển để di chuyển ô đang chọn.\nSử dụng các phím số từ 1-9 để nhập.\nSử dụng phím 0 để bật/tắt ghi chú."

function setUpBoard() {
    generateBoard = sudoku.generate(difficulty)
    Board = sudoku.board_string_to_cell(generateBoard)

    solveBoard = sudoku.solve(generateBoard)
    SolveBoard = sudoku.board_string_to_grid(solveBoard)

    gameButton.innerText = "Restart Game"

    grid.innerHTML = ""
    var gridTable = document.createElement('table')

    for (let i = 0; i < 9; i++) {
        var gridTableRecord = document.createElement("tr")
        for (let j = 0; j < 9; j++) {
            let tableData = createTdElement(i, j)
            gridTableRecord.appendChild(tableData)
        }
        gridTable.appendChild(gridTableRecord)
    }
    grid.appendChild(gridTable)
    activeCell = document.getElementById("0&0")
    errorCount = 0
}

function chooseDifficulty() {
    difficulty = document.getElementById("difficulty").value;
    setUpBoard()
}

function enableNote() {
    isNote = !isNote
    if (isNote) {
        note.style.backgroundColor = "green"
    } else {
        note.style.backgroundColor = normalCellColor
    }
}

function createTdElement(i, j) {
    let td = document.createElement("td");
    td.id = i + "&" + j

    if (i === 0 || i === 3 || i === 6) {
        td.style.borderTop = cellColorBorder
    }
    if (i === 2 || i === 5 || i === 8) {
        td.style.borderBottom = cellColorBorder
    }

    if (j === 0 || j === 3 || j === 6) {
        td.style.borderLeft = cellColorBorder
    }
    if (j === 2 || j === 5 || j === 8) {
        td.style.borderRight = cellColorBorder
    }

    td.setAttribute('onclick', "clickCell(" + i + "," + j + ")");
    if (Board[i][j].value !== ".") {
        td.style.color = clickCellColor
        td.innerText = Board[i][j].value
    }
    return td;

}

function clickCell(i, j) {
    if (!Board[i][j].canChangedValue) return
    if (activeCell.style.backgroundColor === normalCellColor || activeCell.style.backgroundColor === activeCellColor) {
        activeCell.style.backgroundColor = normalCellColor
    }
    activeRow = i
    activeCol = j
    applyActiveCell()
}

window.addEventListener('keydown', (e) => {
    let num = parseInt(e.key)
    if (num >= 1 && num <= 9) {
        if (isNote) {
            activeCell.style.fontSize = "20px"
            if (activeCell && Board[activeRow][activeCol].value === ".") {
                if (!activeCell.innerText.includes(num.toString())) {
                    activeCell.innerText += num.toString()
                }
            }
        } else {
            activeCell.style.fontSize = "xxx-large"
            activeCell.innerText = num.toString()
            Board[activeRow][activeCol].value = num.toString()
            if (errorCheck === "check") {
                if (Board[activeRow][activeCol].value !== SolveBoard[activeRow][activeCol]) {
                    activeCell.style.backgroundColor = inputCellErrorColor
                    errorCount++;
                    errorCheckStatus.innerText = "Total error: " + errorCount + "/" + maximumError[difficulty]
                } else {
                    activeCell.style.backgroundColor = activeCellColor
                }
            }
        }
    }

    if (num === 0) {
        enableNote()
    }

    switch (e.key) {
        case "ArrowUp":
            if (activeRow >= 1) {
                checkRightNumber()
                activeRow--
                applyActiveCell()
            }
            break
        case "ArrowDown":
            if (activeRow <= 7) {
                checkRightNumber()
                activeRow++
                applyActiveCell()
            }
            break
        case "ArrowLeft":
            if (activeCol >= 1) {
                checkRightNumber()
                activeCol--
                applyActiveCell()
            }
            break
        case "ArrowRight":
            if (activeCol <= 7) {
                checkRightNumber()
                activeCol++
                applyActiveCell()
            }
            break

    }
})

function applyActiveCell() {
    activeCell = document.getElementById(activeRow + "&" + activeCol)
    if (Board[activeRow][activeCol].value !== "." && Board[activeRow][activeCol].value !== SolveBoard[activeRow][activeCol]) {
        activeCell.style.backgroundColor = inputCellErrorColor
    } else {
        activeCell.style.backgroundColor = activeCellColor
    }
}

function checkRightNumber() {
    if (Board[activeRow][activeCol].value !== "." && Board[activeRow][activeCol].value !== SolveBoard[activeRow][activeCol]) {
        activeCell.style.backgroundColor = inputCellErrorColor
    } else {
        activeCell.style.backgroundColor = normalCellColor
    }
}

function restart() {
    setUpBoard()
}

function errorCheckChange() {
    errorCheck = document.getElementById("errorCheck").value;
    if (errorCheck === "check") {
        errorCheckStatus.style.display = "inline"
        errorCheckStatus.innerText = "Total error: " + errorCount + "/" + maximumError[difficulty]
    } else {
        errorCheckStatus.style.display = "none"
    }

}
