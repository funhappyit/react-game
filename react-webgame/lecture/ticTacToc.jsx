import React, { useEffect,useReducer, useCallback } from 'react';
import Table from './Table';

const initalState = {
    winner:'',
    turn:'O',
    tableData:[
        ['','',''],
        ['','',''],
        ['','','']
    ],
    recentCell: [-1,-1],
}

 //reducer로 action을 어떻게 처리할지 만든다. 
 //export 로 모듈로 만들어 td.jsx에 불러온다.
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
const reducer = (state,action) =>{
    switch (action.type){
        case 'SET_WINNER':
            return {
                ...state,
                winner: action.winner,
            };
        case 'CLICK_CELL':{
            //기존의 tableData를 얕은 복사를 해준다.
            const tableData = [...state.tableData];
            //action.row => 줄 객체가 있으면 얕은 복사를 해준다. 
            tableData[action.row] = [...tableData[action.row]];//immer라는 라이브러리로 가독성 해결 
            tableData[action.row][action.cell] = state.turn;
            return{
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        }
        case 'CHANGE_TURN':{ 
            return{
                ...state,
                turn: state.turn === 'O' ? 'X':'O',
            };
        }
        case 'RESET_GAME':{
            return{
               ...state,
                turn:'O',
                tableData:[
                    ['','',''],
                    ['','',''],
                    ['','','']
                ],
                recentCell: [-1,-1],
            };
        }
        default:
            return state;
    }

}
const TicTacToe = () => {
    //state를 직접 바꿀수 없기 때문에 action을 만들고 
   
    const [state, dispatch] = useReducer(reducer, initalState);
    const {tableData, turn, winner,recentCell} = state;
    //state의 갯수를 줄이는 useReducer사용 
    //const [winner,setWinner] = useState('');
    //const [turn,setTurn] = useState('0');
    //const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);
    const onClickTable = useCallback(()=>{
        //dispatch안에 들어가는것은 action 객체라고 불림 
        //action이 state가 돼는것은 아님 action을 state로 직접 바꿔줘야함 
        dispatch({ type: 'SET_WINNER', winner:'0' });
    },[]);
    //비동기에서 무언가를 쓸때는 useEffect
    useEffect(()=>{
        const [row, cell] = recentCell;
        if( row < 0 ){
            return;
        }
        console.log("turn"+turn);
        let win = false; 
        if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
            win = true;
        }
        if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){
            win = true;
        }
        if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
            win = true;
        }
        if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
            win = true;
        }
        if(win){ //승리시 
            dispatch({type: SET_WINNER, winner: turn});
            dispatch({type: RESET_GAME});
        }else{
            let all = true; //-> all이 true면 무승부라는 뜻
            tableData.forEach((row)=>{// 무승부 검사 
                row.forEach((cell) => {
                    if(!cell){
                        all = false;
                    }
                });
            });
            if (all){
                dispatch({type: RESET_GAME});
            }else{
                dispatch({type: CHANGE_TURN});
            }
           
        }

    },[recentCell]);



    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
            {winner && <div>{winner}님의 승리</div>}
        </>
    );
};

export default TicTacToe;