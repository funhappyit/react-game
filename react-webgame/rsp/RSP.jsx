import React, {Component} from 'react';
//클래스의 경우 => constructor부분 먼저 실행 -> render -> ref -> componentDidMount
//-> (setState/props 바뀔때 -> render -> componentDidUpdate)
// 부모가 나를 없앴을때 -> componentWillUnmount -> 소멸

class RSP extends Component {
    state = {
         result :'',
         imgCoord: 0,
         score: 0,
    }
    //render가 되고나서 한번실행 리렌더링이 될때에는 실행되지 않음
    //컴포넌트의 라이프 스타일 
    componentDidMount() { // 컴포넌트가 첫 렌더링된후 

    }
    componentDidUpdate(){//리렌더링 후 

    }
    componentWillUnmount() {//컴포넌트가 제거되기 직전

    }
    render() {
        const {result, score, imgCoord} = this.state;
        return (    
            <>
                <div id="computer" style={{background:'url(https://en.pimg.jp/023/182/267/1/23182267.jpg)'}}>가위바위보</div>
            </>
        );
    }
}
export default RSP;