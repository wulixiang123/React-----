import React, { useEffect, useState } from 'react'
import PubSub from 'pubsub-js'
import context from './context'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
const App = () => {
    let [todos, setTodos] = useState([
        { id: Math.random().toString(36).slice(2), title: '吃饭', isDone: true },
        { id: Math.random().toString(36).slice(2), title: '睡觉', isDone: false },
        { id: Math.random().toString(36).slice(2), title: '打豆豆', isDone: false }
    ])
    useEffect(()=>{
        let addTodoId = PubSub.subscribe('addTodo', (msg, title)=>{
            // 
            setTodos(todos=>{
                let todo = {
                    id:Math.random().toString(36).slice(2),
                    title,
                    isDone:false
                }
                return [todo, ...todos]
            })
        })

        let deleteId = PubSub.subscribe('deleteTodo', (msg, id)=>{
            if(!window.confirm('确定删除么')) return;
            setTodos(todos=>{
                return todos.filter(todo=>todo.id !== id)
            })
        })

        let checkOneId = PubSub.subscribe('checkOne', (msg, id)=>{
            setTodos(todos=>{
                return todos.map(todo=>{
                    if(todo.id === id){
                        todo.isDone = !todo.isDone
                    }
                    return todo;
                })
            })
        })

        let checkAllId = PubSub.subscribe('checkAll', (msg, isDone)=>{
            setTodos(todos=>{
                return todos.map(todo=>{
                    todo.isDone = isDone;
                    return todo;
                })
            })
        })

        let deleteIsDoneId = PubSub.subscribe('deleteIsDone', (msg, data)=>{
            if(!window.confirm('确定删除已完成的数据么')) return;
            setTodos(todos=>{
                return todos.filter(todo=>!todo.isDone);
            })
        })
        return ()=>{
            PubSub.unsubscribe(addTodoId)
            PubSub.unsubscribe(deleteId)
            PubSub.unsubscribe(checkOneId)
            PubSub.unsubscribe(checkAllId)
            PubSub.unsubscribe(deleteIsDoneId)
        }
    },[])
    return (
        <context.Provider value={todos}>
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header />
                    <Main />
                    <Footer />
                </div>
            </div>
        </context.Provider>
    )
}
export default App;
