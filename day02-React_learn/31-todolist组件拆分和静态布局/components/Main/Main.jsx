import React, { Component } from 'react'
import Item from '../Item/Item'
import './index.css'
export default class Main extends Component {
  render() {
    return (
      <div>
        <ul className="todo-main">
            <Item/>
            <Item/>
            <Item/>
        </ul>
      </div>
    )
  }
}
