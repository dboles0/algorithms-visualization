const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 45;

const getStartingGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    heapIdx: 0,
  };
};

const newGridWithWalls = (grid, row, col) => {
  const updatedGrid = grid.slice();
  const node =  updatedGrid[row][col];
  const newNode = {
    ...node,
    isWall: true,
  };
  updatedGrid[row][col] = newNode;
  return updatedGrid;
}

let Functions = {
  getStartingGrid,
  createNode,
  newGridWithWalls,
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
};

module.exports = Functions;
