import React, { useState } from 'react'
/**
 * hook 函数【钩子函数】
 * 
 * useState: 让函数组件拥有状态
 * 语法：let [状态数据,设置状态的函数] = useState(状态初始值)
 * 
 * 例如: let [count, setCount] = useState(10)
 * 
 * setCount(新状态值)
 */
export default function App() {
    // let res = useState(10);
    // console.log('res: ', res); // [10, f]
  let [count,setCount] = useState(10);
  return (
    <div>
        <p>state count: {count}</p>
        <p><button onClick={()=>{
            setCount(count+1)
        }}>count+</button></p>
    </div>
  )
}
