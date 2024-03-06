const spreadSheetcontainer = document.querySelector("#spreadsheet-container");
const ROWS = 10;
const COLS = 10;
const spreadSheet = [];

class Cell {
  constructor(isHeader, disabled, data, row, column, active = false) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.active = active;
  }

  getCellId() {
    return "cell_" + this.row + this.column;
  }
}

const createCellElement = (cell) => {
  const cellElement = document.createElement("input");
  cellElement.className = "cell";
  cellElement.id = cell.getCellId();
  cellElement.value = cell.data;
  cellElement.disabled = cell.disabled;

  return cellElement;
};

const drawSheet = () => {
  for (let i = 0; i < spreadSheet.length; i++) {
    for (let j = 0; j < spreadSheet[i].length; j++) {
      const cell = spreadSheet[i][j];
      spreadSheetcontainer.append(createCellElement(cell));
    }
  }
};

const initSpreadSheet = () => {
  for (let col = 0; col < COLS; col++) {
    const rows = [];
    for (let row = 0; row < ROWS; row++) {
      const cell = new Cell(false, false, `${col}-${row}`, col, row, false);
      rows.push(cell);
    }
    spreadSheet.push(rows);
  }
  drawSheet();
  console.log(spreadSheet);
};

initSpreadSheet();
