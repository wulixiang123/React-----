import React, { Component } from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
export default class App extends Component {
  render() {
    return (
        <div className="todo-container">
        <div className="todo-wrap">
        <Header/>
        <Main/>
        <Footer/>
        </div>
        </div>
    )
  }
}
