import React,{useMemo,useEffect, useRef,memo} from 'react';
import Td from './Td';

const Tr = memo(({rowData, rowIndex, dispatch}) => {
    console.log('tr rendered');
    const ref = useRef([]);

    useEffect(()=>{
        //바뀌는게 있다면 false가 됌 
        console.log(rowData === ref.current[0], dispatch === ref.current[1], rowIndex === ref.current[2] );
        ref.current = [rowData,dispatch,rowIndex];
    },[rowData, dispatch, rowIndex]);
    
    
    
    return (
        <tr>
            {/*i가 cell index가 됀다. 몇번째 칸인지를 나타냄 */}
            {Array(rowData.length).fill().map((td,i) => (
                useMemo(
                    () => <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} CellData={rowData[i]}>{''}</Td>,
                    [rowData[i]]
                )
            ))}
        </tr>
    )
});

export default Tr;