## How to start application

1. **Install the dependencies**

   Run `nom install` to install packages.

2. **Run the application**

   Start the development server by running `npm run start`. Application will be available on `http://localhost:3000` by default

   **Note:** Application was run and tested on node v16.7.0

## Using Application

A red cell indicates an alive cell. Clicking on a cell can toggle its alive/dead state.
Click the generate button to run a generation. The reset button will set the board back to its default state (all cells dead)

To change Grid size go to 'src/components/Simulator/index.tsx and change the following variables

1. numCols - Determines the number of columns
2. numROws - Determines the number of rows
3. cellLength - Determines size of each cell

## Improvements

If more time was available the following improvements would be made

1. Styling improvements as current project has minimal styling
2. More test coverage
