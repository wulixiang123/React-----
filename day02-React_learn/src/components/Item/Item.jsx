import React from 'react'
import './index.css'
export default function Item({todo}) {
    return (
        <li>
            <label>
                <input type="checkbox" checked={todo.isDone}/>
                <span>{todo.title}</span>
            </label>
            <button className="btn btn-danger">删除</button>
        </li>
    )
}
