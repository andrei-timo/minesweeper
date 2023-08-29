import './App.css';
import Board from "./components/board/Board";
import {useEffect, useState} from "react";
import {boardMap, boardSettings, cellObj, generateMap} from "./utils/generateMap";
import React from 'react';

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
        setBoardMap(generateMap(boardSettings))
        setGameStatus('notStarted')
    }

    const [openedCells, setOpenCells] = useState(0)
    const onClick = (cellX: number, cellY: number) => {
        const handleClick = (cellX: number, cellY: number) => {
            const cell = boardMap[cellX][cellY]
            if (cell.isMine) {
                setGameStatus('lost')
                return
            }
            cell.isOpen = true
            const boardMapCopy = [...[...boardMap]]
            boardMapCopy[cellX][cellY].isOpen = true
            setBoardMap(boardMapCopy)
        }
        switch (gameStatus) {
            case 'won':
            case 'lost': { return }
            case 'notStarted': setGameStatus('inGame')
            default: handleClick(cellX, cellY)
        }
    }

    return (
        <div className="App">
            {boardMap && <Board boardMap={boardMap} onClick={onClick}/>}
        </div>
    );
}
export default App;
