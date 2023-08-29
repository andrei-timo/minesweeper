import React from 'react';
import {boardMap, cellObj} from "../../utils/generateMap";
import Cell from './Cell';

type BoardProps = {
    boardMap: boardMap,
    handleClick: (x: number, y: number) => void,
}

const Board = ({ boardMap, handleClick }: BoardProps) => {
    console.log(handleClick)
    return (
        <div className="board">
            {boardMap && boardMap.map((cellRow: cellObj[], x) => {
                    return cellRow.map((cellObj: cellObj, y) => (
                        <Cell cell={cellObj} onClick={() => handleClick(x, y)} />
                    ))
                }
            )}
        </div>
    )
}

export default Board;
