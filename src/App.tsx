import React, { useState } from "react";

/**
 *
 * Use React and TypeScript.
 Please include some attempt at testing your code.
 While not mandatory, a meaningful git history will be looked upon favourably.
 */

/**
  *
  * At initial state, User should see an empty board.
  User can make Cells "alive".
  User can make Cells "dead".
  User can trigger "next generation".
  User can trigger a "reset" to the initial state.
  */

// Initial empty board
// onClick - toggle cells in board (alive/dead status)
// Reset button - reset to initial state i.e all cells dead
// Simulate button - logic to work out

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
  const numCols = 15;
  const numRows = 15;
  const cellLength = 30;
  const [grid, setGrid] = useState<TGrid>(() =>
    createInitialGrid(numRows, numCols)
  );

  const toggleGridState = (x: number, y: number) => {
    const newGrid = [...grid];
    newGrid[x][y] = !newGrid[x][y];

    setGrid(newGrid);
  };

  return (
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
              toggleGridState(x, y);
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
  );
}

export default App;
