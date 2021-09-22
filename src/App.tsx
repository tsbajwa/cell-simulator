import React, { useState } from "react";
import produce from "immer";
/**
 *
 * Use React and TypeScript.
 Please include some attempt at testing your code.
 While not mandatory, a meaningful git history will be looked upon favourably.
 */

/**
  *
  * At initial state, User should see an empty board. DONE
  User can make Cells "alive". DONE
  User can make Cells "dead". DONE
  User can trigger "next generation".
  User can trigger a "reset" to the initial state. [DONE]
  */

// Initial empty board
// onClick - toggle cells in board (alive/dead status)
// Reset button - reset to initial state i.e all cells dead
// Simulate button - logic to work out

// GRID IS 0 based
//TODO: cleanup. Be careful of referencing same array vs creating new
const createInitialGrid = (numRows: number, numCols: number) => {
  const grid = [];
  for (let i = 0; i < numRows; i++) {
    const row = Array.from(Array(numCols), () => false);
    grid.push(row);
  }

  return grid;
};

type TGrid = boolean[][];

function App() {
  const numCols = 5;
  const numRows = 5;
  const cellLength = 30;
  const [grid, setGrid] = useState<TGrid>(() =>
    createInitialGrid(numRows, numCols)
  );

  const [generating, setGenerating] = useState(false);

  const toggleCellState = (x: number, y: number) => {
    setGrid((grid) => {
      return produce(grid, (newGrid) => {
        newGrid[x][y] = !newGrid[x][y];
        return newGrid;
      });
    });
  };

  const resetGrid = () => {
    setGrid(createInitialGrid(numRows, numCols));
  };

  //TODO: A Cell who "comes to life" outside the board should wrap at the other side of the board.
  const getTotalAliveNeighbours = (grid: TGrid, x: number, y: number) => {
    let totalAliveNeighbours = 0;

    // offset
    const neighbourRelativePositions = [
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
    ];

    neighbourRelativePositions.forEach(([relativeX, relativeY]) => {
      const neighbourX = x + relativeX;
      const neighbourY = y + relativeY;
      const neighbourValue = grid[neighbourX]?.[neighbourY];
      // A true value signifies that neighbour is alive
      neighbourValue && totalAliveNeighbours++;
    });

    return totalAliveNeighbours;
  };

  const startGeneration = () => {
    setGrid((grid) => {
      return produce(grid, (newGrid) => {
        for (let x = 0; x < newGrid.length; x++) {
          for (let y = 0; y < newGrid[x].length; y++) {
            const currentCell = grid[x][y];
            const aliveNeighbours = getTotalAliveNeighbours(grid, x, y);

            if (currentCell) {
              if (aliveNeighbours < 2) {
                newGrid[x][y] = false;
              }
              if (aliveNeighbours === 2 || aliveNeighbours === 3) {
                newGrid[x][y] = true;
              }
            } else {
              if (aliveNeighbours === 3) {
                console.log(x, y, currentCell, aliveNeighbours);

                newGrid[x][y] = true;
              }
            }
          }
        }
        return newGrid;
      });
    });
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, ${cellLength}px)`,
        }}
      >
        {grid.map((rows, x) =>
          rows.map((col, y: number) => (
            <div
              key={`${x}${y}`}
              onClick={() => {
                toggleCellState(x, y);
              }}
              style={{
                width: cellLength,
                height: cellLength,
                backgroundColor: grid[x][y] ? "red" : "white",
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
      <span onClick={resetGrid}>Reset Button</span>
      <span onClick={startGeneration}>Generate Button</span>
    </>
  );
}

export default App;
