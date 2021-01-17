//require은 node의 모듈 시스템
import React,{ PureComponent,createRef } from 'react';
import Try from './Try';

function getNumbers(){//숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수 
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i=0; i<4;i+=1){
        const chosen = candidate.splice(Math.floor(Math.random()*(9 - i)),1)[0];
        array.push(chosen);
    }
    return array;
}
class numberBaseball extends PureComponent {
    state = {
        result:'',
        value: '',
        answer: getNumbers(),//ex: [1,3,5,7]
        tries:[], // push 쓰면 안 돼요 
    };
    onSubmitForm = (e) => {
        const {value, answer, tries} = this.state;
        e.preventDefault();
        if(value === answer.join('')){
            this.setState({
                result:'홈런',
                tries: [...tries, {try: value, result:'홈런!'}],
            })
            this.inputRef.current.focus();
        }else{ // 답 틀렸으면
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9){ //10번 이상 틀렸을때 
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다!`,
                });
                alert('게임을 다시 시작합니다!!');
                this.setState({
                    value:'',
                    answer: getNumbers(),
                    tries: [],
                });
                this.inputRef.current.focus();
            } else {
                for(let i=0; i < 4; i += 1){
                    if(answerArray[i] === answer[i]){
                        strike += 1;
                    }else if(answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                this.setState({
                    tries: [...tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
                    value: '',
                })
            }
        }
    };
    onChangeInput = (e) =>{
        console.log(this.state.answer);
        this.setState({
            value: e.target.value,
        });
    };
    inputRef = createRef();
  //  onInputRef = (c) => {this.inputRef = c};

    render(){
        const {result, value, tries} = this.state;
       //this.setState를 하면 render가 발생되므로 무한 반복이 생겨 문제가 생긴다. 
       // render안에 this.setState를 쓰지 않도록 주의한다. 
        return(
           <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    {/* 주석 */}
                    <input ref={(c) => {this.onInputRef}} maxLength={4} value={value} onChange={this.onChangeInput}/>   
                </form>
                <div>시도:{tries.length}</div>
                <ul>
                    {tries.map((v, i) => {
                        return(
                           <Try key={`${i + 1}차 시도`} tryInfo={v} index={i}/>
                        );
                    })}
                </ul>
           </>
       );
   }
}
/*
export const hello = 'hello'; //import {hello}
export const bye = 'hello'; // import{hello,bye}
*/
/*
노드 모듈 시스템에서 
module.exports = {hello:'a'};
exports hello = 'a'는 같습니다.
*/
export default numberBaseball;//import numberBaseball;