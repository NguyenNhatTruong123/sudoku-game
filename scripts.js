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

var maximumError = {
    "easy": 2,
    "medium": 2,
    "hard": 3,
    "very-hard": 4,
    "insane": 5,
    "inhuman": 10
}

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
        note.style.backgroundColor = "white"
    }
}

function createTdElement(i, j) {
    let td = document.createElement("td");
    td.id = i + "&" + j

    let colorBorder = "3px solid green"

    if (i === 0 || i === 3 || i === 6) {
        td.style.borderTop = colorBorder
    }
    if (i === 2 || i === 5 || i === 8) {
        td.style.borderBottom = colorBorder
    }

    if (j === 0 || j === 3 || j === 6) {
        td.style.borderLeft = colorBorder
    }
    if (j === 2 || j === 5 || j === 8) {
        td.style.borderRight = colorBorder
    }

    td.setAttribute('onclick', "clickCell(" + i + "," + j + ")");
    if (Board[i][j].value !== ".") {
        td.style.color = "goldenrod"
        td.innerText = Board[i][j].value
    }
    return td;

}

function clickCell(i, j) {
    if (Board[i][j].value === ".") {
        activeCell.style.backgroundColor = "white"
        activeRow = i
        activeCol = j
        applyActiveCell()
    }
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
            if (activeCell && Board[activeRow][activeCol].value === ".") {
                activeCell.innerText = num.toString()
                if (errorCheck === "check" && num.toString() !== SolveBoard[activeRow][activeCol]) {
                    activeCell.style.backgroundColor = "#ff00007a"
                    errorCount++;
                    errorCheckStatus.innerText = "Total error: " + errorCount + "/" + maximumError[difficulty]
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
    activeCell.style.backgroundColor = "beige"
}

function checkRightNumber() {
    if (Board[activeRow][activeCol].canChangeValue) {
        activeCell.style.backgroundColor = "white"
    } else {
        if (activeCell.innerText !== "" && activeCell.innerText !== SolveBoard[activeRow][activeCol]) {
            activeCell.style.backgroundColor = "#ff00007a"
        } else {
            activeCell.style.backgroundColor = "white"
        }
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
