const spreadSheetcontainer = document.querySelector("#spreadsheet-container");
const ROWS = 10;
const COLS = 10;
const spreadSheet = [];

/**
 * Cell 을 담당하는 HTML 태그의 #id 값을 생성하는 함수
 * @param row : cell 의 row 위치
 * @param col : cell 의 column 위치
 * @returns {string} : 해당 row-column 에 위치한 CELl 의 ID
 */
const makeCellId = (row, col) => {
  return "cell_" + row + col;
};

/**
 * Cell 의 클래스
 * isHeader : 헤더 셀인가?
 * disabled : 비활성화
 * data : Cell 의 데이터
 * row : 몇 번째 row 에 위치하는지
 * column : 몇 번째 column 에 위치하는지
 * rowName : row 의 이름(Header 에 적힌 값)
 * columnName : column 의 이름(Header 에 적힌 값)
 * active : 활성화 상태인지 (사용자가 선택한 셀인지)
 */
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

  // 이 셀의 cellId 를 생성하는 메서드
  getCellId() {
    return makeCellId(this.row, this.column);
  }
}

/**
 * Row 와 Column 위치로 Cell 엘리먼트를 가져오는 함수
 * @param row
 * @param col
 * @returns {Element}
 */
const getElementFromRowCol = (row, col) => {
  return document.querySelector("#" + makeCellId(row, col));
};

/**
 * spreadSheet 의 header 들 active 상태된 것이 있으면 다 지우는 함수
 */
const clearHeaderActiveStates = () => {
  const headers = document.querySelectorAll(".header");

  headers.forEach((header) => header.classList.remove("active"));
};

/**
 * 사용자가 셀을 선택했을 때 실행되는 함수
 * @param cell : 선택한 셀의 Cell 클래스 정보
 */
const handleCellClick = (cell) => {
  // 먼저 이전에 작성된 셀의 active 상태를 다 지운다.
  clearHeaderActiveStates();

  // 선택한 셀이 위치에 컬럼, 로 헤더의 엘리먼트를 가져와서 active 상태로 만든다.
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



/**
 * Cell 클래스를 활용해서 Element 생성하는 함수
 * @param cell
 * @returns {HTMLInputElement}
 */
const createCellElement = (cell) => {
  // Cell 은 input 엘리먼트로 만든다.
  const cellElement = document.createElement("input");

  // cellElement 속성 부여
  cellElement.className = "cell";
  cellElement.id = cell.getCellId();
  cellElement.value = cell.data;
  cellElement.disabled = cell.disabled;

  // Header 인 Cell 은 구분이 가능하게 class 를 추가로 준다.
  if (cell.isHeader) {
    cellElement.classList.add("header");
  }

  // Cell 엘리먼트의 이벤트 등록
  cellElement.onclick = () => handleCellClick(cell);

  return cellElement;
};

/**
 * SpreadSheet 를 그린다.
 * : ROWS, COLUMNS 로 엑셀 레이아웃을 만드는 함수
 */
const drawSheet = () => {
  for (let i = 0; i < spreadSheet.length; i++) {
    // Row 를 열개씩 넣기
    const rowContainerElement = document.createElement("div");
    rowContainerElement.className = "row-container";

    for (let j = 0; j < spreadSheet[i].length; j++) {
      const cell = spreadSheet[i][j];
      // 엘리먼트로 Cell 정보가 담긴 input 엘리먼트를 넣는다
      rowContainerElement.append(createCellElement(cell));
    }

    spreadSheetcontainer.append(rowContainerElement);
  }
};

/**
 * row 와 column 의 위치에 ㄸ라ㅏ Cell 클래스의 속성 값을 다르게 부여한다.
 * @param row
 * @param col
 * @returns {{rowName: string, columnName: (string|string)}}
 */
const getCellPropertyValue = (row, col) => {
  const cellPropertyValue = {
    rowName: row || "",
    columnName: col ? String.fromCharCode(64 + col) : "",
  };

  // row 가 0번째 줄이면? Column Header
  if (row === 0) {
    cellPropertyValue.isHeader = true;
    cellPropertyValue.disabled = true;
    cellPropertyValue.data = cellPropertyValue.columnName;
  }

  // column 이 0 번째 줄이면? Row Header
  else if (col === 0) {
    cellPropertyValue.isHeader = true;
    cellPropertyValue.disabled = true;
    cellPropertyValue.data = cellPropertyValue.rowName;
  }

  // 그 이외는 모두 사용자가 입력할 수 있는 Cell
  else {
    cellPropertyValue.isHeader = false;
    cellPropertyValue.disabled = false;
    cellPropertyValue.data = "";
  }

  return cellPropertyValue;
};

/**
 * Spread Sheet 를 생성하고 DOM 에 그리는 함수
 */
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
