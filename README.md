# minesweeper

The App component will contain a Header and a Board.
Board is a 2 dimentional array of Cells.
Each cell receives the display values and an onClick handler.

Cell -> CellState, onClick, onContextMenuEvent
Board -> Map of CellState, game state

State - Two dimentional array of CellState object, Game state (ongoing/done), timer, bomb count
CellState -> Number?, open/closed, isBomb, isFlag
