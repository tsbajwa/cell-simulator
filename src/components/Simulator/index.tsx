import React, { useState } from "react";
import produce from "immer";
import { createGrid, getNextGridState } from "./helpers";
import { TGrid } from "./types";

const Simulator = () => {
  const numCols = 50;
  const numRows = 50;
  const cellLength = 30;

  const [grid, setGrid] = useState<TGrid>(() => createGrid(numRows, numCols));

  const toggleCellState = (x: number, y: number) => {
    setGrid((grid) =>
      produce(grid, (newGrid) => {
        newGrid[x][y] = !newGrid[x][y];
        return newGrid;
      })
    );
  };

  const handleResetGrid = () => {
    setGrid(createGrid(numRows, numCols));
  };

  const handleGridGeneration = () => {
    setGrid((grid) => getNextGridState(grid));
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
          rows.map((col, y) => (
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
      <button onClick={handleResetGrid}>Reset</button>
      <button onClick={handleGridGeneration}>Generate</button>
    </>
  );
};

export default Simulator;
