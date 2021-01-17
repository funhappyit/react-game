import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';
import RenderTest from './RenderTest';
import ResponseCheck from './ResponseCheck';

//const Hot = hot(numberBaseball);
const Hot =  hot(ResponseCheck);
ReactDOM.render(<Hot/>, document.querySelector('#root'));
