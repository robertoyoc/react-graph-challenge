

import { useEffect, useState } from 'react';
import './graph.styles.css';







const Graph = () => {

  const MAX_HEIGHT = 100;

  const [values, setValues] = useState({});
  const [max, setMax] = useState(0);

  useEffect(() => {
    generate()

  }, [])

  const generate = () => {
    let obj = {}
    for (let i= 2; i <= 12; i++) {
      obj[i] = 0;
    }
    setValues(obj);
  }

  const dieRolls = (number) => {
    let process = values;
    for(let i= 0; i < number; i++) {
      process = diceRoll(process);
    }

    
    const max = Object.keys(process).reduce((pv, cv) => pv < process[cv] ? process[cv]: pv, 0);


    setMax(max)

    setValues(process)
  }

  const diceRoll = (obj) => {
    const number1 = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    const number2 = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    const result = number1 + number2;

    return {
      ...obj,
      [result]: obj[result] + 1
    };
  }

  return (
    <div>
      <div className='component'>
        <button className='gray-button' onClick={() => dieRolls(1)}>1x</button>
        <button className='gray-button' onClick={() => dieRolls(10)}>10x</button>
        <button className='gray-button' onClick={() => dieRolls(100)}>100x</button>
        <button className='gray-button' onClick={() => dieRolls(1000)}>1000x</button>
        <button className='gray-button' onClick={() => generate()}>Clear</button>
      </div>
      <div className='graph'>
        <div className='content'>
          {
            Object.keys(values)?.map((id) => (
              <div key={id} className='column' style={{height: `${values[id]/max*MAX_HEIGHT}%`}}>.</div>
            ))
          }
        </div>
        <div className='headers'>
          {
            Object.keys(values)?.map((id) => (
              <div key={id}>{id}</div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Graph;