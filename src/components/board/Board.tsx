import React from 'react';
import {boardMap, cellObj} from "../../utils/generateMap";

type BoardProps = {
    boardMap: boardMap,
}
const Board: React.FC<BoardProps> = ({ boardMap }) => {
    return (
        <div>
            {boardMap && boardMap.map((cellRow: cellObj[]) => {
                    return cellRow.map((cellObj: cellObj) => (
                        <div>1</div>
                    ))
                }
            )}
        </div>
    );
}

export default Board;