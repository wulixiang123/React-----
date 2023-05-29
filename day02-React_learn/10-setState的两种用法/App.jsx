import React, { Component } from 'react'

export default class App extends Component {
  state = {
    count:1
  }
  render() {
    console.log('App render');
    let {count} = this.state
    return (
      <div>
        <p>count:{count}</p>
        <p><button onClick={()=>{
          //每次只能+1,因为setState是一个异步的方法,count不能获取最新变化后的结果
          this.setState({
            count:count + 1
          })
          this.setState({
            count:count + 1
          })
          this.setState({
            count:count + 1
          })
        }}>count+3</button></p>

        <p><button onClick={()=>{
          // setState 使用方法二：
          /**
           * 接收一个回调函数作为参数
           * 1. 回调函数的参数是最新变化后的状态数据，
           * 2. 回调函数的返回值，是设置的最新状态
           */
          console.log(111);
          this.setState((state)=>{
            console.log('state:',state);
            return{
              count:state.count + 1
            }
          })
          this.setState((state)=>{
            console.log('state:',state);
            return{
              count:state.count + 1
            }
          })
          this.setState((state)=>{
            console.log('state:',state);
            return{
              count:state.count + 1
            }
          })
          console.log('end');
        }}>count + 3</button></p>
      </div>
    )
  }
}
