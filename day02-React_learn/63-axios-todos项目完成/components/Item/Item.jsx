import React from 'react'
import './index.css'
export default function Item({todo,deleteTodo,changeState}) {
    return (
        <li>
            <label>
                <input type="checkbox" checked={todo.isDone} onChange={(e)=>changeState(todo.id, e.target.checked)}/>
                <span>{todo.title}</span>
            </label>
            <button className="btn btn-danger" onClick={()=>deleteTodo(todo.id)}>删除</button>
        </li>
    )
}
