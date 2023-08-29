export type cellObj = {
    bombCount?: number,
    isBomb: boolean,
    isFlag: boolean,
    isOpen: boolean,
}
export function generateMap(rows: number, columns: number, totalMines: number) {
    const board: cellObj[][] = [];

    // Create the empty board
    for (let i = 0; i < rows; i++) {
        board[i] = Array(columns).fill({
            isBomb: false,
            isFlag: false,
            isOpen: false,
        });
    }

    let minesCount = 0;

    // Randomly place mines on the board
    while (minesCount < totalMines) {
        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * columns);

        // Place a mine at the random position if there is no mine already
        if (!board[randomRow][randomCol].isBomb) {
            board[randomRow][randomCol].isBomb = true;
            minesCount++;
        }
    }

    // Calculate the number of adjacent mines for each cell
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            if (!board[row][col].isBomb) {
                let count = 0;

                // Check adjacent cells for mines
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const newRow = row + i;
                        const newCol = col + j;

                        // Skip checking out-of-bounds indices
                        if (
                            newRow < 0 ||
                            newRow >= rows ||
                            newCol < 0 ||
                            newCol >= columns
                        ) {
                            continue;
                        }

                        // Increment count if the adjacent cell is a mine
                        if (board[newRow][newCol] === "mine") {
                            count++;
                        }
                    }
                }

                // Assign the number of adjacent mines to the cell
                board[row][col] = count;
            }
        }
    }

    return board;
}