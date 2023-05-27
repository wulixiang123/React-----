import React from "react";
import Son from "./components/Son";
/**
 *  在一个组件中使用组件调用标签，调用另一个组件，那么就会产生父子组件的概念
 *  父组件可以给子组件传递数据
 *  1. 父组件如何传递数据给子组件？
 *     在子组件的调用标签上，通过属性传递
 * 
 *  2. 子组件中如何接收父组件传递的数据
 *     this.props属性接收父组件传递的数据
 * 
 * 
 * 在类组件中，如果父组件重新render渲染了，那么子组件也会无条件重新render渲染
 */

class App extends React.Component{
  state = {
    count:1,
    msg:'atguigu'
  }
  // 1. 父组件中定义方法
  addCount(num){
    console.log('num:',num);
    this.setState({
      count:this.state.count + num
    })
  }
  render(){
    let {count,msg} = this.state;
    return(
      <>
        <h3>App</h3>
        <p>state count:{count}</p>
        <p>state msg:{msg}</p>
        
        <p><button onClick={()=>{
          this.setState({
            count:100
          })
        }}>count++</button></p>
        <hr />
        {/**2. 通过标签属性将方法传递给子组件 */}
        <Son count={count} msg = {msg} school = '尚硅谷'/>
      </>
    )
  }
}

export default App;