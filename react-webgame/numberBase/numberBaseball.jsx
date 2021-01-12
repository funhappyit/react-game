//require은 node의 모듈 시스템
import React,{ Component } from 'react';
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
class numberBaseball extends Component {
    state = {
        result:'',
        value: '',
        answer: getNumbers(),
        tries:[],
    };
    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.value === this.state.answer.join('')){
            this.setState({
                result:'홈런',
                tries: [...this.state.tries, {try:this.state.value, result:'홈런!'}],
            })
        }else{
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
    
        }
    };
    onChangeInput = (e) =>{
        this.setState({
            value: e.target.value,
        });
    };
    fruits = [
        {fruit:'사과',taste:'맛있다'},
        {fruit:'감',taste:'맛없다'},
        {fruit:'귤',taste:'맛있다'},
        {fruit:'사과',taste:'맛없다'},
        {fruit:'사과',taste:'맛없다'},
    ];
    render(){
       return(
           <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    {/* 주석 */}
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>   
                </form>
                <div>시도:{this.state.tries.length}</div>
                <ul>
                    {this.fruits.map((v, i) => {
                        return(
                           <Try key={v.fruit + v.taste} value={v} index={i}/>
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