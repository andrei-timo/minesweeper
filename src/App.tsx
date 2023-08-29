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

    const [openedCells, setOpenCells] = useState(0)
    const handleClick = (cellX: number, cellY: number) => {
        const onClick = (cellX: number, cellY: number) => {
            if (cellX < 0 || cellY < 0
                || cellX > boardSettings.columns
                || cellY > boardSettings.rows) return
            const cell = boardMap[cellX][cellY]
            if (cell.isMine) {
                setGameStatus('lost')
                return
            }
            cell.isOpen = true
            const boardMapCopy = [...[...boardMap]]
            boardMapCopy[cellX][cellY].isOpen = true
            setBoardMap(boardMapCopy)
            if (boardMapCopy[cellX][cellY].mineCount === 0) {
                for (let i = 0; i < 3; i++) {
                    onClick(cellX - 1, cellY - 1)
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

    useEffect(() => {
        if (gameStatus === 'inGame') return
        if (gameStatus === 'notStarted') setBoardMap(generateMap(boardSettings))
        if (gameStatus === 'won') alert('You won!')
        if (gameStatus === 'lost') alert('You lost!')
    }, [gameStatus])

    return (
        <div className="App">
            {boardMap && <Board boardMap={boardMap} handleClick={handleClick}/>}
        </div>
    );
}

export default App;
