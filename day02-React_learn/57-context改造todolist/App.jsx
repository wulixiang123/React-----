import React, { useState } from 'react'
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
