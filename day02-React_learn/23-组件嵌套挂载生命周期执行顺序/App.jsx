import React, { Component } from 'react'
import Son from './components/Son';

export default class App extends Component {
    // 组件挂载完成之后执行
    componentDidMount(){
        console.log('App- componentDidMount');
        //1. 创建定时器
        //2. 发送ajax请求
        //3. 添加自定义事件
        //4. 订阅消息
    }
    constructor(){
        super()
        console.log('App- constructor');
    }
  render() {
    console.log('App- render');
    return (
      <div>
        <h3>App</h3>
        <Son/>
      </div>
    )
  }
}
