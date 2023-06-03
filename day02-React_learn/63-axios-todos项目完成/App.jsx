import React, { useEffect, useState } from 'react'
import { addTodo, checkOne, deleteById, getTodos } from './api/todos'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
const App = () => {
    let [todos, setTodos] = useState([])
    async function _getTodos(){
        let todos = await getTodos()
        console.log('todos',todos);
        setTodos(todos);
    }
    useEffect(()=>{
        _getTodos();
    },[])

    async function createTodo(title){
        console.log('App title', title);
        let todo = {
            title,
            isDone:false
        }
        await addTodo(todo)// 添加todo
        _getTodos();// 重新获取todos列表
    }

    async function deleteTodo(id){
        if(!window.confirm('确定删除么？')) return;
        await deleteById(id);
        _getTodos();// 重新获取todos列表
    }

    async function changeState(id,isDone){
        await checkOne(id, isDone);
        _getTodos();// 重新获取todos列表
    }
    return (
        <div className="todo-container">
            <div className="todo-wrap">
                <Header createTodo={createTodo}/>
                <Main todos={todos} deleteTodo={deleteTodo} changeState={changeState}/>
                <Footer />
            </div>
        </div>
    )
}
export default App;
