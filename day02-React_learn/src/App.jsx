import React, { Component } from 'react'
import Son from './components/Son'

export default class App extends Component {
  render() {
    return (
      <div>
        <h3>App</h3>
        <Son msg={'123'}/>
      </div>
    )
  }
}
