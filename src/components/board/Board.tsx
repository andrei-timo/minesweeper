import React from "react";
import { boardMap, cellObj } from "../../utils/generateMap";
import Cell from "./Cell";

type BoardProps = {
  boardMap: boardMap;
  handleClick: (x: number, y: number) => void;
  handleRightClick: (x: number, y: number) => void;
};

const Board = ({ boardMap, handleClick, handleRightClick }: BoardProps) => {
  return (
    <div className="board">
      {boardMap &&
        boardMap.map((cellRow: cellObj[], x) => {
          return cellRow.map((cellObj: cellObj, y) => (
            <Cell
              cell={cellObj}
              onClick={() => handleClick(x, y)}
              onRightClick={() => handleRightClick(x, y)}
            />
          ));
        })}
    </div>
  );
};

export default Board;
