import React from 'react';
import ReactDOM from 'react-dom';
import numberBaseball from './numberBaseball';
import {hot} from 'react-hot-loader/root';

const Hot = hot(numberBaseball);
ReactDOM.render(<Hot/>, document.querySelector('#root'));
