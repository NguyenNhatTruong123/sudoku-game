document.addEventListener('contextmenu', event => event.preventDefault());
var grid = document.getElementById("grid")
var difficulty = document.getElementById("difficulty").value;
var winStatus = document.getElementById("winStatus");
var gameButton = document.getElementById("gameButton");
var errorCheck = document.getElementById("errorCheck").value;
var errorCheckStatus = document.getElementById("errorCheckStatus");

var Board;
var generateBoard

var activeCell = ""
var activeRow = 0
var activeCol = 0

var maximumError = {
    "easy": 2,
    "medium": 2,
    "hard": 3,
    "very-hard": 4,
    "insane": 5,
    "inhuman": 10
}

function setUpBoard() {
    generateBoard = sudoku.generate(difficulty)
    Board = sudoku.board_string_to_grid(generateBoard)

    winStatus.style.display = "none"
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

}

function chooseDifficulty() {
    difficulty = document.getElementById("difficulty").value;
    setUpBoard()
}

function createTdElement(i, j) {
    let td = document.createElement("td");
    td.id = i + "&" + j

    td.setAttribute('onclick', "clickCell(" + i + "," + j + ")");
    if (Board[i][j] !== ".") {
        td.innerText = Board[i][j]
    }
    return td;

}

function clickCell(i, j) {
    activeCell.style = "background-color: white;"
    activeRow = i
    activeCol = j
    activeCell = document.getElementById(i + "&" + j)
    activeCell.style = "background-color: beige;"
}

window.addEventListener('keydown', (e) => {
    let num = parseInt(e.key)
    if (num >= 1 && num <= 9) {
        if (activeCell !== "") {
            activeCell.innerText = num.toString()
        }
    }

    switch (e.key) {
        case "ArrowUp":
            if (activeRow >= 1) {
                activeCell.style = "background-color: white;"
                activeRow--
                activeCell = document.getElementById(activeRow + "&" + activeCol)
                activeCell.style = "background-color: beige;"
            }
            break
        case "ArrowDown":
            if (activeRow <= 7) {
                activeCell.style = "background-color: white;"
                activeRow++
                activeCell = document.getElementById(activeRow + "&" + activeCol)
                activeCell.style = "background-color: beige;"
            }
            break
        case "ArrowLeft":
            if (activeCol >= 1) {
                activeCell.style = "background-color: white;"
                activeCol--
                activeCell = document.getElementById(activeRow + "&" + activeCol)
                activeCell.style = "background-color: beige;"
            }
            break
        case "ArrowRight":
            if (activeCol <= 7) {
                activeCell.style = "background-color: white;"
                activeCol++
                activeCell = document.getElementById(activeRow + "&" + activeCol)
                activeCell.style = "background-color: beige;"
            }
            break

    }

})

function restart() {
    setUpBoard()
}

function errorCheckChange() {
    errorCheck = document.getElementById("errorCheck").value;
    if (errorCheck === "check") {
        errorCheckStatus.style.display = "inline"
        errorCheckStatus.innerText = "Total error: " + maximumError[difficulty]
    } else {
        errorCheckStatus.style.display = "none"
    }

}
