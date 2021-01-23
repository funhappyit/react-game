import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';
import RSP from './RSP';

const Hot = hot(RSP);
//const Hot =  hot(numberBaseballHook);
ReactDOM.render(<Hot/>, document.querySelector('#root'));
