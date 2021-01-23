import React, { PureComponent, memo, useState} from 'react';

class Try extends PureComponent {
   // constructor(props){
      //  super(props);
      //  const filtered = this.props.filter(()=>{

      //  });
      //  this.state = {
          //  result: filtered,
          //  try: this.props.try,
      //  }
  //  }
    state = {
        result: this.props.result,
        try: this.props.try,
    };
    render(){
        const {tryInfo} = this.props;
        return(
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        )
    }
}

export default Try;