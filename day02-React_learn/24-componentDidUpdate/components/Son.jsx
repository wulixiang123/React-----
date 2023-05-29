import React, { Component } from 'react'

export default class Son extends Component {
  /**
     * componentDidUpdate
     * 
     * 执行时机：组件更新之后执行
     * 触发render的条件：
     * 1. new props
     * 2. setState
     * 3. forceUpdate
     * 
     * 操作：
     * 1. 发送ajax请求
     * 2. 更新localStorage本地存储数据
     * 
     */
    componentDidUpdate(){
      console.log('Son的 componentDidUpdate');
    }
  render() {
    let{count} = this.props
    console.log('Son的 render');
    return (
      <div>
        <h3>Son</h3>
        <p>props count:{count}</p>
      </div>
    )
  }
}
