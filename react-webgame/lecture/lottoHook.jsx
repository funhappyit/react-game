import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import Ball from './Ball';

//반복 실행되는 문제가 발생할 수 있음 
function getWinNumbers(){
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
const LottoHook = () => {
    // useMemo : 복잡한 함수 결과값을 기억
    // useRef : 일반 값을 가억
    // useCallback: 함수값 자체를 기억하고 있음 
    // hooks들은 순서가 매우 중요해서 중간에 바꾸면 안됌
    /**
     * // useEffect안에 넣으면 안됀다. 
        확실하게 실행될지 확인돼지 않아서      
        조건문 안에 절대 넣으면 안 되고 함수나 반복문 안에도 웬만하면 넣지 마세요.
        순서가 확실하게 정해진 반복문 같은경우에는 useState가 실행될 것 
        if(조건){
            const [redo, setRedo] = useState(false);
        }
     */
    /**
        const mounted = useRef(false);
        useEffect(()=>{
            if(!mounted.current){
                mounted.current = true;
            }else{
                //ajax 
            }
        },[바뀌는 값]); // componentDidUpdate만 componentDidMount x
     */
    const lottoNumbers = useMemo(()=> getWinNumbers(),[]);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);
    //onClickRedo
    useEffect(()=>{
        console.log("useEffect");
        //비동기와 변수와 같이 쓰면 클로져 문제가 생기는데 let을 쓰면 안생김
         for(let i=0; i< winNumbers.length -1; i++){
            timeouts.current[i] = setTimeout(() => {
             setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1)*1000);
         }
       timeouts.current[6] = setTimeout(()=>{
            setBonus(winNumbers[6]);
            setRedo(true);
         }, 7000);
         return () => {
             timeouts.current.forEach(()=>{
                 clearTimeout(v);
             })
         };//componentWillUnmount 자리 
    }, [timeouts.current]);// 빈 배열이면 componentDidMount와 동일 
    // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행 

    // 함수 자체를 기억해 둬서 함수 컴포넌트가 재실행돼도 onClickRedo 함수를 다시 만들어 주지 않는다.
    const onClickRedo = useCallback(() => {
        console.log("onClickRedo");
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    },[winNumbers]);
    return (
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
            {/*자식 컴포넌트에 함수를 넘길때는  useCallback을 꼭해줘야한다.
                새로 함수를 계속만들면 새로 계속 랜더링을 해버린다
                자식이 매번 리렌더링을 해버리기 때문에
                useCallback을 해줘야지 다시 리렌더링 해주지 않는다. 
            */}
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={onClickRedo}>한 번 더</button>}
        </>
    );

}
export default LottoHook;