import React, { Component } from 'react'
import imgSrc from './assets/images/1.jpg'
export default class App extends Component {
    state = {
        index:1
    }
  render() {
    let {index} = this.state
    return (
      <div>
        <h3>网络图片</h3>
        <img src="https://images.unsplash.com/photo-1520808663317-647b476a81b9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8YW5pbWFsfHx8fHx8MTY4NTMzOTk2Ng&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500" alt="" />
        <h3>本地图片-require</h3>
        <img src={require(`./assets/images/${index}.jpg`)} alt="" />
        <h3>本地图片-import</h3>
        <img src={imgSrc} alt="" />
      </div>
    )
  }
}
