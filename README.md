# Game Of Life X React

This is a simple implementation of Conway's Game of Life using React. The game is played on a 2D grid of cells, where each cell can be either alive or dead. The game progresses in turns, where each turn the state of each cell is updated based on the state of its neighbors. The rules are as follows:

1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

The game is played by clicking on cells to toggle their state between alive and dead, and then clicking the "Start" button to progress the game starts tick by tick.
