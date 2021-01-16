import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';
import RenderTest from './RenderTest';

//const Hot = hot(numberBaseball);
const Hot =  hot(RenderTest);
ReactDOM.render(<Hot/>, document.querySelector('#root'));
