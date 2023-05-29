import React, { Component } from 'react'
import moment from 'moment';
/**
 * moment使用：
 * 作用：格式化时间
 * 1. 安装： npm i moment
 * 2. import 导入
 * 3. 调用
 */
export default class Son extends Component {
  state = {
    nowTime:moment().format('YYYY年MM月DD日 HH:mm:ss')
  }
  componentDidMount(){
    console.log('this:',this);
    this.timer = setInterval(()=>{
      console.log(111);
      this.setState({
        nowTime:moment().format('YYYY年MM月DD日 HH:mm:ss')
      })
    },1000)
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  render() {
    let{nowTime} = this.state
    return (
      <div>
        <p>当前时间是:{nowTime}</p>
      </div>
    )
  }
}
