import React, { Component, useContext } from 'react'
import context from '../../context'
import Item from '../Item/Item'
import './index.css'
export default function Main() {
    let todos = useContext(context);
    return (
        <ul className="todo-main">
            {todos.map(todo => (
                <Item key={todo.id} todo={todo}/>
            ))}
        </ul>
    )
}
