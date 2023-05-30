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
    // 1 父组件中定义方法
    addTodo(title){
        console.log('App title: ', title);
        // 拼接出一个新的todo，添加到todos数组中
        const todo = {
            id:nanoid(),
            title,
            isDone:false
        }
        this.setState({
            todos:[...this.state.todos,todo]
        })
    }
    render() {
        let {todos} = this.state;
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header addTodo={this.addTodo.bind(this)}/>
                    <Main todos={todos}/>
                    <Footer todos={todos}/>
                </div>
            </div>
        )
    }
}
