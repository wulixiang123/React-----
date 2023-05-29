import React, { Component } from 'react'

export default class App extends Component {
    // 组件挂载完成之后执行
    componentDidMount(){
        console.log('我第三个执行~~~我是componentDidMount');
        //1. 创建定时器
        //2. 发送ajax请求
        //3. 添加自定义事件
        //4. 订阅消息
    }
    constructor(){
        super()
        console.log('我第一个执行~~~我是constructor');
    }
  render() {
    console.log('我第二个执行~~~我是render');
    return (
      <div>App</div>
    )
  }
}
