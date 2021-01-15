import React from 'react';
import ReactDOM from 'react-dom';
import numberBaseball from './numberBaseball';
import {hot} from 'react-hot-loader/root';
import numberBaseballHook from './numberBaseballHook';

//const Hot = hot(numberBaseball);
const Hot =  hot(numberBaseballHook);
ReactDOM.render(<Hot/>, document.querySelector('#root'));
