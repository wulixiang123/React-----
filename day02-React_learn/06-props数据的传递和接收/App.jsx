import React from "react";
import Son from "./components/Son";
/**
 *  在一个组件中使用组件调用标签，调用另一个组件，那么就会产生父子组件的概念
 *  父组件可以给子组件传递数据
 *  1. 父组件如何传递数据给子组件？
 *     在子组件的调用标签上，通过属性传递-看28行
 * 
 *  2. 子组件中如何接收父组件传递的数据
 *     this.props属性接收父组件传递的数据
 * 
 * 
 */

class App extends React.Component{
  state = {
    count:1,
    msg:'atguigu'
  }
  render(){
    let {count,msg} = this.state;
    return(
      <>
        <h3>App</h3>
        <p>state count:{count}</p>
        <p>state msg:{msg}</p>
        <hr />
        <Son count={count} msg = {msg} school = '尚硅谷'/>{/* 传递数据给子组件 */}
      </>
    )
  }
}

export default App;