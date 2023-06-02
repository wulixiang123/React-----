import React from 'react'
import PubSub from 'pubsub-js'
import './index.css'
export default function Item({todo}) {
    return (
        <li>
            <label>
                <input type="checkbox" checked={todo.isDone} onChange={()=>{
                    PubSub.publish('checkOne', todo.id)
                }}/>
                <span>{todo.title}</span>
            </label>
            <button className="btn btn-danger" onClick={()=>{
                PubSub.publish('deleteTodo', todo.id)
            }}>删除</button>
        </li>
    )
}
