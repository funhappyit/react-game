import React, {Component} from 'react';
import Ball from './Ball';

//반복 실행되는 문제가 발생할 수 있음 
function getWinNumbers(){
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i)=> i+1);
    const shuffle = [];
    while(candidate.length > 0){
        //셔플 방법 
        shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p,c) => p - c);
    return [...winNumbers, bonusNumber];
}
class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(), //당첨 숫자들
        winBalls: [],
        bonus: null,//보너스 공 
        redo: false,
    };
    timeouts = [];
    //컴포넌트 시작하자마자 실행
    componentDidMount(){
        //this.state로 구조분해 
        const {winNumbers} = this.state;
        //비동기와 변수와 같이 쓰면 클로져 문제가 생기는데 let을 쓰면 안생김
        for(let i=0; i< winNumbers.length -1; i++){
        this.timeouts[i] = setTimeout(() => {
            this.setState((prevState) => {
                return{
                    winBalls: [...prevState.winBalls, winNumbers[i]],
                };
            });
           }, (i + 1)*1000);
        }
        this.timeouts[6] = setTimeout(()=>{
            this.setState({
                bonus:winNumbers[6],
                redo:true,
            });
        }, 7000)
    }
    //정리 메모리 누수 문제 해결 
    componentWillUnmount(){
        this.timeouts.forEach((v)=>{
            clearTimeout(v);
        });
    }
    render(){
        const {winBalls, bonus, redo} = this.state;
        return(
            <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {/*
                    <Ball key={v} number={v} />
                    반복문일때는 이런식으로 분리한다 
                */}
              {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus}/>}
            <button onClick={redo ? this.onClickRedo: () => {}}>한 번 더</button>
          </>
        );
    }
}

export default Lotto;