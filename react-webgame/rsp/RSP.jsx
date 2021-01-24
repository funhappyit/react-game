import React, {Component} from 'react';
//클래스의 경우 => constructor부분 먼저 실행 -> render -> ref -> componentDidMount
//-> (setState/props 바뀔때 -> shouldComponentUpdate -> render -> componentDidUpdate)
// 부모가 나를 없앴을때 -> componentWillUnmount -> 소멸
//좌표 
const rspCoords = {
    바위: 0,
    가위: '-142px',
    보: '-284px',
};
const scores = {
    가위: 1,
    바위: 0,
    보: -1,  
};
const computerChoice = (imgCoord) => {
    //컴퓨터가 어떤걸 초이스 하는지 선택하는것 
    return Object.entries(rspCoords).find(function(v){
        return v[1] === imgCoord
    })[0];
}

class RSP extends Component {
    state = {
         result :'',
         imgCoord: 0,
         score: 0,
    };
    interval;
    //render가 되고나서 한번실행 리렌더링이 될때에는 실행되지 않음
    //컴포넌트의 라이프 스타일 
    //누군가 setInterval 취소를 안해주면 계속해서 돈다.
    componentDidMount() { // 컴포넌트가 첫 렌더링된후 -> 비동기 요청을 많이 해요
        //clearInterval를 해줘야지 메모리 누수가 생기지 않는다.
        //비동기가 바깥에 있는 변수를 참조하면 closer발생
        this.interval = setInterval(this.changeHand, 100);
    }
    componentDidUpdate(){//리렌더링 후 

    }
    componentWillUnmount() {//컴포넌트가 제거되기 직전 -> 비동기 요청 정리를 많이 해요
        clearInterval(this.interval);
    }
    changeHand = () => {
        const {imgCoord} = this.state;
        if(imgCoord === rspCoords.바위){
        this.setState({
            imgCoord: rspCoords.가위,
        });
       }else if(imgCoord === rspCoords.가위){
        this.setState({
            imgCoord: rspCoords.보,
        });
       }else if(imgCoord === rspCoords.보){
        this.setState({
            imgCoord: rspCoords.바위,
        });
    }
    }
    onClickBtn = (choice)  => () => {
        console.log("클릭"+choice);
        const {imgCoord} = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
      
        if(diff === 0 ){
            this.setState({
                result: '비겼습니다.!',
            });
        } else if ([-1,2].includes(diff)){
            this.setState((prevState)=> {
                return{
                    result:'이겼습니다.!',
                    score: prevState.score + 1,
                };
            });
        }else{
            this.setState((prevState)=> {
                return{
                    result:'졌습니다!',
                    score: prevState.score - 1,
                };
            }); 
        }
        setTimeout( () => {
            this.interval = setInterval(this.changeHand, 100);
        }, 2000);
       
    };
    render() {
        const {result, score, imgCoord} = this.state;
        return (    
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}
export default RSP;