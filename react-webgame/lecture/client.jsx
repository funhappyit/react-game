import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';
import Lotto from './lotto';
import RenderTest from './RenderTest';
import ResponseCheck from './ResponseCheck';
import ResponseCheckHook from './ResponseCheckHook';

//const Hot = hot(numberBaseball);
const Hot =  hot(Lotto);
ReactDOM.render(<Hot/>, document.querySelector('#root'));
