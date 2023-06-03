import React, { Component } from 'react'
import Item from '../Item/Item'
import './index.css'
export default function Main({ todos,deleteTodo,changeState }) {
    return (
        <ul className="todo-main">
            {todos.map(todo => (
                <Item key={todo.id} todo={todo} deleteTodo={deleteTodo} changeState={changeState}/>
            ))}
        </ul>
    )
}
