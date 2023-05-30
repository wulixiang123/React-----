import React, { Component } from 'react'
import Item from '../Item/Item'
import './index.css'
export default class Main extends Component {
    render() {
        let {todos,deleteTodo,checkOne} = this.props
        return (
            <ul className="todo-main">
                {todos.map(todo=>(
                    <Item key={todo.id} todo={todo} deleteTodo={deleteTodo} checkOne={checkOne}/>
                ))}
            </ul>
        )
    }
}
