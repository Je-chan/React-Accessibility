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
    // Row 를 열개씩 넣기
    const rowContainerElement = document.createElement("div");
    rowContainerElement.className = "row-container";

    for (let j = 0; j < spreadSheet[i].length; j++) {
      const cell = spreadSheet[i][j];
      rowContainerElement.append(createCellElement(cell));
    }

    spreadSheetcontainer.append(rowContainerElement);
  }
};

const initSpreadSheet = () => {
  for (let row = 0; row < ROWS; row++) {
    const cols = [];
    for (let col = 0; col < COLS; col++) {
      let cellData = "";
      if (col === 0) cellData = row || "";
      if (row === 0) cellData = col ? String.fromCharCode(64 + col) : "";
      const cell = new Cell(false, false, cellData, row, col, false);
      cols.push(cell);
    }
    spreadSheet.push(cols);
  }
  drawSheet();
};

initSpreadSheet();
