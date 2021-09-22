import { createGrid } from "../helpers";

describe("Simulator helpers", () => {
  test("Should create a 2d array with correct number of rows and columns", () => {
    const grid = createGrid(10, 9);

    expect(grid).toHaveLength(10);
    expect(grid[0]).toHaveLength(9);
  });

  test("Should create a 2d array with all cell values set to false", () => {
    const grid = createGrid(10, 9);

    expect(grid).toEqual(
      expect.arrayContaining([expect.arrayContaining([false])])
    );
  });
});
