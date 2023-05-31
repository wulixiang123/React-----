import React, { useState } from 'react'
// import ClassHook from './components/ClassHook'
/**
 * hook函数使用原则
 * 1. hook函数只能在函数组件中使用，或者是在其他第三方自定义hook函数中使用,hook函数不能在类组件中使用
 * 2. 必须以完全相同的顺序被调用。hook函数的数量是确定的. 不能写在if语句中或语句下面 也不能写在for循环中
 * 
 */
export default function App() {
    // if(false) return;
    // let [count, setCount] = useState(100);
    for(let i =0; i < 10;i++){
        let [count, setCount] = useState(i);
    }
    return (
        <div>
            <h3>类组件使用hook</h3>
            <p>{count}</p>
            {/* <ClassHook/> */}
        </div>
    )
}
