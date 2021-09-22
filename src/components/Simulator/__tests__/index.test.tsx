import Simulator from "../index";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Simulator Component", () => {
  test("Clicking a dead cell will make cell alive", () => {
    const { getByTestId } = render(<Simulator />);
    const firstCell = getByTestId("cell-00");
    expect(firstCell).toHaveStyle("background-color: white");
    userEvent.click(firstCell);
    expect(firstCell).toHaveStyle("background-color: red");
  });

  test("Reset Button will clear all alive cells", () => {
    const { getByTestId, getByText } = render(<Simulator />);
    const firstCell = getByTestId("cell-00");
    const secondCell = getByTestId("cell-01");

    userEvent.click(firstCell);
    userEvent.click(secondCell);

    expect(firstCell).toHaveStyle("background-color: red");
    expect(secondCell).toHaveStyle("background-color: red");

    const resetButton = getByText("Reset");
    userEvent.click(resetButton);

    expect(firstCell).toHaveStyle("background-color: white");
    expect(secondCell).toHaveStyle("background-color: white");
  });
});
