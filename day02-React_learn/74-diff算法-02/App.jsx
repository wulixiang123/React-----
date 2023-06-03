import React, { useState } from 'react'
import A from './components/A'
import B from './components/B'
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

            <h3>不同组件</h3>
            {/* {count % 2 ? <A/> : <B/>} */}

            <h3>相同组件</h3>
            {count % 2 ? <A school="atguigu"/> : <A school="尚硅谷"/>}
        </div>
    )
}
