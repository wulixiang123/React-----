import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
export default class App extends Component {
    state = {
        todos:[
            {
                id: nanoid(),
                title:'吃饭',
                isDone:true
            },
            {
                id: nanoid(),
                title:'睡觉',
                isDone:true
            },
            {
                id: nanoid(),
                title:'敲代码',
                isDone:true
            }
        ]
    }
    render() {
        let {todos} = this.state;
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header/>
                    <Main todos={todos}/>
                    <Footer todos={todos}/>
                </div>
            </div>
        )
    }
}
