import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';
import Lotto from './lotto';
import LottoHook from './lottoHook';
import RenderTest from './RenderTest';
import ResponseCheck from './ResponseCheck';
import ResponseCheckHook from './ResponseCheckHook';
import TicTacToe from './ticTacToc';

//const Hot = hot(numberBaseball);
const Hot =  hot(TicTacToe);
ReactDOM.render(<Hot/>, document.querySelector('#root'));
