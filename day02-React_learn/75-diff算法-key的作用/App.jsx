import React, { useState } from 'react'

export default function App() {
    /**
     * key: 即可易用id也可以用索引
     * 1. 索引：1-1. 纯列表展示可以用索引
     *          1-2. 向后追加和删除的列表，可以用索引
     * 2. id: 推荐使用的
     */
    let [todos, setTodos] = useState([
        {
            id:1,
            title:'吃饭'
        },
        {
            id:2,
            title:'睡觉'
        }
    ])
    return (
        <div>
            <button onClick={()=>{
                setTodos([{id:88,title:'前追加'},...todos])
            }}>向前追加</button>
            <button onClick={()=>{
                setTodos([...todos,{id:99,title:'后追加'}])
            }}>向后追加</button>
            <ul>
                {todos.map((todo,index)=>(
                    <li key={todo.id}><span>{todo.title}</span> <input type="text" name="" id="" /></li>
                ))}
            </ul>
        </div>
    )
}
