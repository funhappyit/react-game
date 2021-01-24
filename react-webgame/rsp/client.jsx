import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';
import RSP from './RSP';
import RSPHook from './RSPHook';

const Hot = hot(RSPHook);
//const Hot =  hot(numberBaseballHook);
ReactDOM.render(<Hot/>, document.querySelector('#root'));
