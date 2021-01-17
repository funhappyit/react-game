import React, { memo,useState } from 'react';

const TryHook = memo(({tryInfo}) => {
  //props는 직접 바꾸지 않고 state로 만든 다음 바꾼다. 
  const [result, setResult] = useState(tryInfo.result);
  
  const onClick = () => {
    setResult('1');
  }
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div onClick={onClick}>{tryInfo.result}</div>
    </li>
  );
});

export default TryHook;