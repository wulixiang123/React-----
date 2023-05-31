import React, { Component } from 'react'
import Item from '../Item/Item'
import './index.css'
export default function Main() {
    return (
        <ul className="todo-main">
            <Item />
            <Item />
            <Item />

        </ul>
    )
}
