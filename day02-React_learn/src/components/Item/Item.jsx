import React from 'react'
import './index.css'
export default function Item({todo,checkOne,deleteTodo}) {
    return (
        <li>
            <label>
                <input type="checkbox" checked={todo.isDone} onChange={()=>checkOne(todo)}/>
                <span>{todo.title}</span>
            </label>
            <button className="btn btn-danger" onClick={()=>deleteTodo(todo.id)}>删除</button>
        </li>
    )
}
