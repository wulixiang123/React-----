import React, { Component } from 'react'
import './App.css'
export default class App extends Component {
    state = {
        index:0,
        imgs:['1.webp', '2.webp','3.webp','4.webp']
    }
    next(index){
        index++;
        if(index > 3 ){
            index = 0;
        }
        this.setState({
            index
        })
    }
    prev(index){
        index--;
        if(index < 0){
            index = 3
        }
        this.setState({
            index
        })
    }
    render() {
        let {index,imgs} = this.state;
        return (
            <div className="box">
                <img src={require(`./assets/images/${imgs[index]}`)} alt="" />
                <span onClick={()=>this.prev(index)}>&lt;</span>
                <span id='right' onClick={()=>this.next(index)}>&gt;</span>
            </div>
        )
    }
}
