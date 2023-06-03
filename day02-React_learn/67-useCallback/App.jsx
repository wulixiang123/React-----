import React, { useCallback, useState } from 'react'

export default function App() {
    let [count, setCount] = useState(10)
    // 当依赖没有变化时，不会创建新的函数，直接返回旧的函数。
    // 所有的函数都应该使用 useCallback 来包裹，减少不必要的函数创建。
    const addCount = useCallback(()=>{
        setCount(count=>{
            return count + 1
        })
    },[])
    return (
        <div>
            <p>count: {count}</p>
            <p><button onClick={addCount}>count+</button></p>
        </div>
    )
}
