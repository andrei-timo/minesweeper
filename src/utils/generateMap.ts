export type cellObj = {
    mineCount?: number,
    isMine: boolean,
    isFlag: boolean,
    isOpen: boolean,
}
export type boardMap = cellObj[][]
export type boardSettings = {
    rows: number,
    columns: number,
    minesTotal: number,
}
export function generateMap({rows=10, columns=10, minesTotal=10}: boardSettings): cellObj[][] {
    const board: boardMap = [];

    // Create the empty board
    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < columns; j++) {
        board[i][j] = {
                isMine: false,
                isFlag: false,
                isOpen: false,
        }
    }}

    let minesCount = 0;

    // Randomly place mines on the board
    while (minesCount < minesTotal) {
        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * columns);

        // Place a mine at the random position if there is no mine already
        if (!board[randomRow][randomCol].isMine) {
            board[randomRow][randomCol].isMine = true;
            minesCount++;
        }
    }

    // Calculate the number of adjacent mines for each cell
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            if (!board[row][col].isMine) {
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
                        if (board[newRow][newCol].isMine) {
                            count++;
                        }
                    }
                }

                // Assign the number of adjacent mines to the cell
                board[row][col].mineCount = count;
            }
        }
    }

    return board;
}