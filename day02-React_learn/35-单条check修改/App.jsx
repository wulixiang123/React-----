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
    // 根据id删除数据
    deleteTodo(id){
        if(!window.confirm('确定删除么')) return;
        this.setState({
            // 删除就是过滤保留 id不是那一条的所有记录
            todos:this.state.todos.filter(todo=>todo.id !== id)
        })
    }
    // 单条 check修改
    checkOne(id){
        this.setState({
            todos:this.state.todos.map(todo=>{
                if(todo.id === id){
                    todo.isDone = !todo.isDone;
                }
                return todo;
            })
        })
    }
    render() {
        let {todos} = this.state;
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header addTodo={this.addTodo.bind(this)}/>
                    <Main todos={todos} checkOne={this.checkOne.bind(this)} deleteTodo={this.deleteTodo.bind(this)}/>
                    <Footer todos={todos}/>
                </div>
            </div>
        )
    }
}
