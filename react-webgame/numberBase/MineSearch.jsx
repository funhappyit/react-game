import React, {useReducer,createContext,useMemo} from 'react';
import Form from './Form';
import Table from './Table';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION:-2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED:0, //0이상이면 다오픈드
}

//초기값
export const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
});
//지뢰를 심는 함수 
const plantMine = (row,cell,mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row*cell).fill().map((arr,i)=>{
        return i;
    });
    const shuffle = [];
    while(candidate.length > row* cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random()*candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    //테이블 데이터 만들기 
    for(let i=0; i< row;i++){
        const rowData = [];
        data.push(rowData);
        for(let j=0; j < cell ; j++){
            rowData.push(CODE.NORMAL);
        }
    }
    for(let k=0; k< shuffle.length; k++){
        const ver = Math.floor(shuffle[k]/cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    return data;
};

const initialState = {
    tableData:[],
    timer: 0,
    result: '',
};
export const START_GAME = 'START_GAME';
const reducer = (state,action) => {
    switch (action.type){
        case START_GAME:
            return{
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine) //세로,가로,지뢰갯수
            };
        default:
            return state;
    }
}

const MineSearch = () => {
    const [state,dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => {tableData: state.tableData, dispatch}, [state.tableData]);
    return (
        <>
        <TableContext.Provider value={value}>
            <Form/>
            <div>{state.timer}</div>
            <Table/>
            <div>{state.result}</div>
        </TableContext.Provider>
        </>
    );

};

export default MineSearch;