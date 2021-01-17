import React, {Component} from 'react';

class ResponseCheck extends Component {
    state = {
        state:'',
        message:'클릭해서 시작하세요.',
        result: [],
    };
    onClickScreen = () => {

    };
    renderAverage = () => {
        const {result} = this.state;
       return result.length !== 0 
                    && <div>평균 시간: {result.reduce((a, c) => a + c) /result.length}ms</div>
    }
    render() {
        const {state, message} = this.state;
        return(
            <>
                <div 
                  id="screen"
                  className={state}
                  onClick={this.onClickScreen}
                >
                    {message}
                </div>
              {/* {this.state.result.length === 0 
                    ? null 
                    : <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
                } */}
                 {this.renderAverage()}
            </>
        );
    }
}

export default ResponseCheck;