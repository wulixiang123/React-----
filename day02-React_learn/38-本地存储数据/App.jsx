import React, { Component } from 'react'//引入react 解构react中的Component
import { nanoid } from 'nanoid'//随机生成字母+字符串的依赖
import './App.css'//引入自己的APP.js
import Footer from './components/Footer/Footer'//引入自己的Footer文件夹
import Header from './components/Header/Header'//引入自己的Header文件夹
import Main from './components/Main/Main'//引入自己的Main文件夹
export default class App extends Component {//快捷键rcc生成的
    state = {//react上自带的state(状态),不推荐把需要渲染的状态写(固定)死
        todos:[]//这里我们没有赋值,可以让用户自主添加
    }
    componentDidMount(){//挂载 可以创建定时器/发送ajax请求/订阅消息/添加自定义事件
        this.setState({//setState根据对比差异对界面进行最小化重渲染
            todos:JSON.parse(localStorage.getItem('todos')) || []//解析JSON字符串并使用localStorage.getItem获取todos,并返回给todos
        })
    }
    componentDidUpdate(){//更新  组件更新后立即调用
        localStorage.setItem('todos',JSON.stringify(this.state.todos))//解析JSON字符串并使用localStorage.setItem存储todos到浏览器中
    }
    // 1 父组件中定义addTodo方法
    addTodo(title){
        console.log('App title: ', title);
        // 拼接出一个新的todo，添加到todos数组中
        const todo = {
            id:nanoid(),//依赖随机生成字母+数字
            title,//title为空
            isDone:false//默认为false isDone记录选中状态
        }
        this.setState({//setState根据对比差异对界面进行最小化重渲染
            todo:[...this.state.todos,todo]//先把App.jsx中的state中的todos获取到,然后拿到最新的todo进行覆盖返回给todos
        })
    }
    // 根据id删除数据
    deleteTodo(id){
        if(!window.confirm('确定删除么')) return;//判断之前弹个框
        this.setState({//setState根据对比差异对界面进行最小化重渲染
            // 删除就是过滤保留id不是那一条的所有记录
            todos:this.state.todos.filter(todo=>todo.id !== id)//过滤 取todo的所有id id === id 保留  id !== 删除
        })
    }
    // 单条 check修改
    checkOne(id){
        this.setState({//setState根据对比差异对界面进行最小化重渲染
            todos:this.state.todos.map(todo=>{//map创建新数组、修改其内容或增加内容 
                if(todo.id === id){//判断todo.id是否等于要添加的id,是就把isDone的值取反,否则返回todo
                    todo.isDone = !todo.isDone;
                }
                return todo;
            })
        })
    }
    // 清除全部已完成
    clearDone(){
        if(!window.confirm('确定删除已完成的?'))return//判断之前弹个框
        this.setState({//setState根据对比差异对界面进行最小化重渲染
            todos:this.state.todos.filter(todo=>!todo.isDone)// 删除已完成，就是删除掉isDone是true的，也就是保留isDone是false的
        })
    }
    // 全选反选
    checkAll(isDone){
        console.log('App isDone:',isDone);
        this.setState({//setState根据对比差异对界面进行最小化重渲染
            todos:this.state.todos.map(todo=>{//map创建新数组、修改其内容或增加内容 
                todo.isDone = isDone;
                return todo
            })
        })
    }

    render() {
        let {todos} = this.state;//拿到用户输入的内容
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header addTodo={this.addTodo.bind(this)}/>
                    <Main todos={todos} checkOne={this.checkOne.bind(this)} deleteTodo={this.deleteTodo.bind(this)}/>
                    <Footer checkAll={this.checkAll.bind(this)} todos={todos} clearDone={this.clearDone.bind(this)} />
                </div>
            </div>
        )
    }
}
