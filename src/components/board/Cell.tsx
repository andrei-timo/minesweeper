import React from 'react'
import { cellObj as CellObj } from "../../utils/generateMap"

const Cell = ({cell, onClick}: {cell: CellObj, onClick: () => void}) => {
    console.log(cell.isMine)
    let classes = 'cell'
    if (!cell.isOpen) {
        classes += ' cell-closed'
    } else {
        classes += ' cell-open'
    }
    if (cell.isMine && cell.isOpen) {
        classes += ' cell-mine'
    }
    if (cell.isFlag) {
        classes += ' cell-flag'
    }

    return (
        <div className={classes} onClick={onClick}>
            {cell.isOpen && (cell.mineCount)}
        </div>
    );    
}

export default Cell
