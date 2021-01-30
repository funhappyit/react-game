import React, { useState,useReducer, useCallback } from 'react';
import Table from './Table';

const initalState = {
    winner:'',
    turn:'0',
    tableData:[['','',''],['','',''],['','','']],
}

const reducer = (state,action) =>{
    switch (action.type){
        case 'SET_WINNER':
            return {
                ...state,
                winner: action.winner,
            };
    }
}
const TicTacToe = () => {
    const [state, dispatch] = useState(reducer, initalState);

    //state의 갯수를 줄이는 useReducer사용 
    //const [winner,setWinner] = useState('');
    //const [turn,setTurn] = useState('0');
    //const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);
    const onClickTable = useCallback(()=>{
        //dispatch안에 들어가는것은 action 객체라고 불림 
        //action이 state가 돼는것은 아님 action을 state로 직접 바꿔줘야함 
        dispatch({type: 'SET_WINNER',winner:'0'});
    },[]);

    return (
        <>
            <Table onClick={onClickTable}/>
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    );
};

export default TicTacToe;