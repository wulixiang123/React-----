import React, { Component } from 'react'

export default class Son extends Component {
    constructor(){
        super()
        console.log('Son的 constructor');
    }
  render() {
    console.log('Son的 render');
    return (
      <div>Son</div>
    )
  }
  componentDidMount(){
    console.log('Son的 componentDidMount');
  }
}
