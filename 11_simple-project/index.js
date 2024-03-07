const spreadSheetcontainer = document.querySelector("#spreadsheet-container");
const ROWS = 10;
const COLS = 10;
const spreadSheet = [];

const makeCellId = (row, col) => {
  return "cell_" + row + col;
};

class Cell {
  constructor(
    isHeader,
    disabled,
    data,
    row,
    column,
    rowName,
    columnName,
    active = false,
  ) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.rowName = rowName;
    this.columnName = columnName;
    this.active = active;
  }

  getCellId() {
    return makeCellId(this.row, this.column);
  }
}

const getElementFromRowCol = (row, col) => {
  return document.querySelector("#" + makeCellId(row, col));
};

const handleCellClick = (cell) => {
  const columnHeader = spreadSheet[0][cell.column];
  const rowHeader = spreadSheet[cell.row][0];

  const columnHeaderElement = getElementFromRowCol(
    columnHeader.row,
    columnHeader.column,
  );
  const rowHeaderElement = getElementFromRowCol(
    rowHeader.row,
    rowHeader.column,
  );

  columnHeaderElement.classList.add("active");
  rowHeaderElement.classList.add("active");
};

const createCellElement = (cell) => {
  const cellElement = document.createElement("input");
  cellElement.className = "cell";
  cellElement.id = cell.getCellId();
  cellElement.value = cell.data;
  cellElement.disabled = cell.disabled;

  if (cell.isHeader) {
    cellElement.classList.add("header");
  }

  cellElement.onclick = () => handleCellClick(cell);

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

const getCellPropertyValue = (row, col) => {
  const cellPropertyValue = {
    rowName: row || "",
    columnName: col ? String.fromCharCode(64 + col) : "",
  };
  if (row === 0) {
    cellPropertyValue.isHeader = true;
    cellPropertyValue.disabled = true;
    cellPropertyValue.data = cellPropertyValue.columnName;
  } else if (col === 0) {
    cellPropertyValue.isHeader = true;
    cellPropertyValue.disabled = true;
    cellPropertyValue.data = cellPropertyValue.rowName;
  } else {
    cellPropertyValue.isHeader = false;
    cellPropertyValue.disabled = false;
    cellPropertyValue.data = "";
  }

  return cellPropertyValue;
};

const initSpreadSheet = () => {
  for (let row = 0; row < ROWS; row++) {
    const cols = [];
    for (let col = 0; col < COLS; col++) {
      const { isHeader, disabled, data, rowName, columnName } =
        getCellPropertyValue(row, col);
      const cell = new Cell(
        isHeader,
        disabled,
        data,
        row,
        col,
        rowName,
        columnName,
        false,
      );
      cols.push(cell);
    }
    spreadSheet.push(cols);
  }
  drawSheet();
};

initSpreadSheet();
