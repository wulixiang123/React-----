import React, { Component, createRef } from 'react'

export default class App extends Component {
    // 创建ref对象
    inputRef = createRef()
  render() {
    console.log('默认值是null',createRef());// {current:null}
    return (
      <div>
        <h3>App</h3>
        <p><input type="text" ref={this.inputRef}/></p>
        <p><button onClick={()=>{
            console.log('ref',this.inputRef);//赋值成{current:input}
            console.log('dom',this.inputRef.current);//真实dom  <input type="text"/>
            console.log('value',this.inputRef.current.value);//input文本框用户输入的值
        }}>获取ref对象</button></p>
      </div>
    )
  }
}
