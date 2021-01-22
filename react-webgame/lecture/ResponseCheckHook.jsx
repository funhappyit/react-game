import React, {useRef, useState} from 'react';

const ResponseCheckHook = () => {
    //state는 바뀔때 rendering부분이 다시 return 된다. 
    const[state, setState] = useState('waiting');
    const[message, setMessage] = useState('클릭해서 시작하세요.');
    const[result, setResult] = useState([]);
    const timeOut = useRef(null);//ref는 안에 current가 들어있다. 
    const startTime = useRef();
    const endTime = useRef(); 

    const onClickScreen = () => {
        if(state === 'waiting'){
            timeOut.current = setTimeout(()=>{
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤 
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');
        } else if (state === 'ready'){//성급하게 클릭
            clearTimeout(timeOut.current);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요');
         
        } else if (state === 'now'){//반응속도 체크 
           endTime.current = new Date();
           setState('waiting');
           setMessage('클릭해서 시작하세요!');
           setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    };
    const onReset = () => {
        setResult([]);
    };
    const renderAverage = () => {
        return result.length === 0 
        ? null 
        : <>
            <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
            <button onClick = {onReset}>리셋</button>
          </>
    };
    return (
        <>
            <div 
            id="screen"
            className={state}
            onClick={onClickScreen}
            >
                {message}
            </div>
            {/*  result.length !== 0 
                && <div>평균 시간: {result.reduce((a, c) => a + c) /result.length}ms</div>
            } */}
            {/*  함수 안에서 for문과 if문 쓰는 방법 
                {(() => {
                    if (result.length === 0){
                        return null;
                    } else {
                        return <>   
                                <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                                <button onClick = {onReset}>리셋</button>
                            </>
                    }
                })()}
            } */}
            {/*
                return[
                  <div key="사과">사과</div>
                  <div key="배">배</div>
                  <div key="귤">귤</div>  
                ];
            */}

            {renderAverage()}
        </>
    );
};
export default ResponseCheckHook;