import React, { useEffect, useRef, useState } from 'react'

export default function App() {
    let [count, setCount] = useState(10)
    let flagRef = useRef(true)
    let [flag, setFlag] = useState(true);
    // let flag = true;
    useEffect(()=>{// componentDidMount + componentDidUpdate
        if(flagRef.current){// componentDidMount
            flagRef.current = false;
            return;
        }
        // if(flag){
        //     flag = false;
        //     return;
        // }

        // if(flag){
        //     setFlag(false);
        //     return;
        // }
        // componentDidUpdate
        console.log('666');
    });

    return (
        <div>
            <p>count: {count}</p>
            <p><button onClick={()=>{
                setCount(count + 1)
            }}>count+</button></p>
        </div>
    )
}
