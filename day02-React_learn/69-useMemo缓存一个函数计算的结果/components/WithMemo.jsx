import React,{useMemo, useState} from 'react';
 
export default function WithMemo() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');
 
    const expensive =  useMemo(()=> { // expensive 昂贵的
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    },[count])
 
    return <div>
        <h4>{count}-{val}-{expensive}</h4>
        <div>
            <button onClick={() => setCount(count + 1)}>+c1</button>
            <input value={val} onChange={event => setValue(event.target.value)}/>
        </div>
    </div>;
}