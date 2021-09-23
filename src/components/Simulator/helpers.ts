import { TGrid } from "./types";
import produce from "immer";

export const createGrid = (numRows: number, numCols: number) => {
  const grid = [];
  for (let i = 0; i < numRows; i++) {
    const row = Array.from(Array(numCols), () => false);
    grid.push(row);
  }

  return grid;
};

export const getNextGridState = (grid: TGrid) =>
  produce(grid, (newGrid) => {
    for (let x = 0; x < newGrid.length; x++) {
      for (let y = 0; y < newGrid[x].length; y++) {
        const cell = grid[x][y];
        const aliveNeighbours = getAliveNeighbours(grid, x, y);

        if (
          (cell && aliveNeighbours === 2) ||
          (cell && aliveNeighbours === 3) ||
          (!cell && aliveNeighbours === 3)
        ) {
          newGrid[x][y] = true;
        } else {
          newGrid[x][y] = false;
        }
      }
    }
    return newGrid;
  });

const getAliveNeighbours = (grid: TGrid, x: number, y: number) => {
  let totalAliveNeighbours = 0;

  const offsetPos = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  offsetPos.forEach(([relativeX, relativeY]) => {
    // (0,0) based
    const neighbourX = x + relativeX;
    const neighbourY = y + relativeY;
    let neighbourValue = grid[neighbourX]?.[neighbourY];

    // Cell falls outside of board. Check other side of boards value as a
    // cell who "comes to life" outside the board should wrap
    if (neighbourValue === undefined) {
      const numRows = grid.length;
      const numCols = grid[0].length;

      let wrappedX = neighbourX;
      let wrappedY = neighbourY;

      // Cell outside bottom edge
      if (neighbourX >= numRows) {
        wrappedX = wrappedX - numRows;
      }

      // Cell outside top edge
      if (neighbourX < 0) {
        wrappedX = wrappedX + numRows;
      }

      // Cell outside right edge
      if (neighbourY >= numCols) {
        wrappedY = wrappedY - numCols;
      }

      // Cell outside left edge
      if (neighbourY < 0) {
        wrappedY = wrappedY + numCols;
      }

      neighbourValue = grid[wrappedX][wrappedY];
    }

    // A true value signifies that neighbour is alive
    neighbourValue && totalAliveNeighbours++;
  });

  return totalAliveNeighbours;
};
