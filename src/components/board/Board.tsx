import React from 'react';

function Board({boardMap: boardMap}) {
    return (
        <div>
            {boardMap && boardMap.map((cellRow: cellObj[]) => {
                    cellRow.map((cellObj: cellObj) => {
                        <Cell cellObj={cellObj}/>
                    })
                }
            )}
        </div>
    );
}

export default Board;