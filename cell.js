class Cell {
    constructor(row, col, value) {
        this.row = row
        this.col = col
        this.value = value
        if (value !== ".") {
            this.canChangedValue = false
        } else {
            this.canChangedValue = true
        }

    }
}