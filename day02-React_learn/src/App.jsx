import React, { Component } from 'react'
import './App.css'
export default class App extends Component {
    state = {
        index:1
    }
    prev(index){
        index--;
        if(index<1){
            index = 4
        }
        this.setState({
            index
        })
    }
    next(index){
        index++;
        if(index>4){
            index = 1
        }
        this.setState({
            index
        })
    }
  render() {
    let {index} = this.state
    return (
      <div className='box'>
        <img src={require(`./assets/images/${index}.webp`)} alt="" />
        <span onClick={()=>this.prev(index)}>&lt;</span>
        <span id='right' onClick={()=>this.next(index)}>&gt;</span>
      </div>
    )
  }
}
