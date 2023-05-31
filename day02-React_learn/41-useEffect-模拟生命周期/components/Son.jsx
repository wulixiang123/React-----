import React, { useEffect, useState } from 'react'
/**
 * 在一个函数组件中 useEffect 可以使用多次，都会被执行
 */
export default function Son({ age }) {
    let [count, setCount] = useState(10)
    let [msg, setMsg] = useState('atguigu');
    // 1. 相当于是 componentDidMount
    useEffect(() => {
        console.log('111');
    }, [])
    // useEffect 可以使用多次
    useEffect(() => {
        console.log('222');
    }, [])
    // 2. 相当于是 componentDidMount + componentDidUpdate[state-count, props-age]
    useEffect(() => {
        console.log('count change');
    }, [count, age])

    // 3. 相当于是 componentDidMount + componentDidUpdate 【所有的state和所有的props】
    useEffect(() => {
        console.log('look at all state + props')
        return () => { // componentWillUnmount
            console.log('组件即将卸载')
        }
    })

    // 4. componentWillUnmount
    useEffect(() => {
        return () => { // componentWillUnmount
            console.log('组件即将卸载')
        }
    }, [])
    return (
        <div>
            <h4>Son</h4>
            <p>Son state count: {count}</p>
            <p>Son state msg: {msg}</p>
            <p>Son props age: {age}</p>
            <p><button onClick={() => setCount(count + 1)}>count++</button></p>
            <p><button onClick={() => setMsg(msg + '!')}>msg !</button></p>
        </div>
    )
}
