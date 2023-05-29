import React, { Component } from 'react'

export default class Son extends Component {
  /**
     * componentWillUnmount 【重要】
     * 组件即将被卸载执行
     * 操作：
     *  1. 关闭定时器
     *  2. 解绑自定义事件
     *  3. 取消订阅消息
     */
    componentWillUnmount(){
      console.log('Son的 componentWillUnmount');
    }
    componentDidMount(){
      console.log('Son的 componentDidMount');
    }
  render() {
    let {count} = this.props
    console.log('Son render');
    return (
      <div>
        <h3>Son</h3>
        <p>props count{count}</p>
      </div>
    )
  }
}
