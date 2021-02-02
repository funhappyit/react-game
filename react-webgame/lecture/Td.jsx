import React, {memo, useCallback, useEffect, useRef} from 'react';
import { CLICK_CELL, CHANGE_TURN } from './ticTacToc';

const Td = memo(({rowIndex, cellIndex, dispatch, CellData}) => {
    //렌더링
    const onClickTd = useCallback(() => {
        //기존에 있던 CellData가 있으면 return 
        if(CellData){
            return;
        }
        dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
      
    },[CellData]);
    return (
        <td onClick={onClickTd}>{CellData}</td>
    )
});

export default Td;