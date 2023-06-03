import React, { useState } from 'react'

export default function App() {
    let [count, setCount] = useState(1);
    return (
        <div>
            <button onClick={()=>{
                setCount(count + 1)
            }}>count++</button>
            <h3>对比不同类型的元素</h3>
            {count % 2 ? <p>内容</p>  : <div>内容</div>}
            <h3>相同的元素</h3>
            {count % 2 ? <p school='atguigu'>我是p标签</p> : <p school='尚硅谷'>我是p标签</p>}
            
        </div>
    )
}
