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

    // useEffect(() => {
    //     const map = generateMap(boardSettings)
    //     setBoardMap(map)
    // }, [])

    return (
        <div className="App">
            {boardMap && <Board boardMap={boardMap}/>}
        </div>
    );
}

export default App;
