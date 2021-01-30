import {hot} from 'react-hot-loader/root';
import RSP from './RSP';
import RSPHook from './RSPHook';
import TicTacToe from './ticTacToc';

const Hot = hot(TicTacToe);
//const Hot =  hot(numberBaseballHook);
ReactDOM.render(<Hot/>, document.querySelector('#root'));