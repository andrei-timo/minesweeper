import React, { useEffect } from "react";
import { cellObj as CellObj } from "../../utils/generateMap";

const Cell = ({
  cell,
  onClick,
  onRightClick,
}: {
  cell: CellObj;
  onClick: () => void;
  onRightClick: () => void;
}) => {
  let classes = "";
  if (cell.isFlag) {
    classes = "cell-flag";
  } else if (cell.isMine && cell.isOpen) {
    classes = "cell-mine";
  } else if (cell.isOpen) {
    classes = "cell-open";
  } else {
    classes = "cell-closed";
  }

  return (
    <div
      className={`cell ${classes}`}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
    >
      {cell.isOpen && cell.mineCount}
    </div>
  );
};

export default Cell;
