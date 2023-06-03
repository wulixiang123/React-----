import React, { useState } from 'react'

function Son({msg}) {
    console.log('Son render');
    let [count, setCount] = useState(10)
    const addCount = () => {
        setCount(count => {
            return count + 1
        })
    }
    return (
        <div>
            <p>count: {count}</p>
            <p>props msg: {msg}</p>
            <p><button onClick={addCount}>count+</button></p>
            <p><button onClick={() => {
                setCount(999); // useState已经对状态不变的赋值做了优化，只多渲染一次
            }}>count = 999</button></p>
        </div>
    )
}
export default React.memo(Son)//阻止Son的重新渲染