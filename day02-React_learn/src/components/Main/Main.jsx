import React, { Component, useContext } from 'react'
import Item from '../Item/Item'
import './index.css'
import context from '../../context';
export default function Main({deleteTodo,checkOne}) {
    let todos = useContext(context)
    console.log(todos);
    return (
        <ul className="todo-main">
            {todos.map(todo=>(
                <Item key={todo.id} todo={todo} checkOne={checkOne} deleteTodo={deleteTodo}/>
            ))}
        </ul>
    )
}
