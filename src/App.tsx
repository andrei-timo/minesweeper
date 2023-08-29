import './App.css';
import Board from "./components/board/Board";
import React, {useEffect, useState} from "react";
import {boardMap, boardSettings, generateMap} from "./utils/generateMap";

function App() {
    const defaultBoardSettings: boardSettings = {rows: 10, columns: 10, minesTotal: 10}
    const [boardMap, setBoardMap] = useState<boardMap>(generateMap(defaultBoardSettings))
    const [boardSettings, setBoardSettings] = useState<boardSettings>({
        rows: 10,
        columns: 10,
        minesTotal: 10,
    })

    type gameStatus = 'notStarted' | 'inGame' | 'won' | 'lost'
    const [gameStatus, setGameStatus] = useState<gameStatus>('notStarted')

    const reset = (boardSettings: boardSettings): void => {
        setGameStatus('notStarted')
    }

    const [openCells, setOpenCells] = useState(0)
    const handleClick = (cellX: number, cellY: number) => {
        const onClick = (cellX: number, cellY: number) => {
            if (cellX < 0 || cellY < 0
                || cellX > boardSettings.columns
                || cellY > boardSettings.rows) return

            const cell = boardMap[cellX][cellY]
            if (cell.isMine) {
                setGameStatus('lost')
            }
            cell.isOpen = true
            if (!cell.isMine) {
                setOpenCells((prevState) => prevState + 1)
                if (openCells === boardSettings.rows * boardSettings.columns - boardSettings.minesTotal) {
                    setGameStatus('won')
                }
            }

            const boardMapCopy = [...[...boardMap]]
            boardMapCopy[cellX][cellY].isOpen = true
            setBoardMap(boardMapCopy)
            if (boardMapCopy[cellX][cellY].mineCount === 0) {
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (i === 0 && j === 0) return;
                        onClick(cellX + i, cellY + j)
                    }
                }
            }
            switch (gameStatus) {
                case 'won':
                case 'lost':
                    return
                case 'notStarted':
                    setGameStatus('inGame')
                default:
                    onClick(cellX, cellY)
            }
        }
    }
    const handleRightClick = (cellX: number, cellY: number) => {
        const cell = boardMap[cellX][cellY]
        if (cell.isOpen) return

        const boardMapCopy = [...[...boardMap]]
        boardMapCopy[cellX][cellY].isFlag = !cell.isFlag
        setBoardMap(boardMapCopy)
    }

    const showMines = () => {
        const boardMapCopy = [...[...boardMap]]
        for (let i = 0; i < boardMapCopy.length; i++) {
            for (let j = 0; j < boardMapCopy[i].length; j++) {
                if (boardMapCopy[i][j].isMine) {
                    boardMapCopy[i][j].isOpen = true
                }
            }
        }
    }
    const handleLose = () => {
        showMines()
        alert('You lost!')
    }
    const handleWin = () => {
        showMines()
        alert('You won!')
    }

    useEffect(() => {
        if (gameStatus === 'inGame') return
        if (gameStatus === 'notStarted') setBoardMap(generateMap(boardSettings))
        if (gameStatus === 'won') handleWin()
        if (gameStatus === 'lost') handleLose()
    }, [gameStatus])

    return (
        <div className="App">
            {boardMap && <Board boardMap={boardMap} handleClick={handleClick} handleRightClick={handleRightClick}/>}
        </div>
    );
}

export default App;
