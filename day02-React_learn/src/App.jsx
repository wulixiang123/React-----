import React, { Component } from 'react'
import Son from './components/Son';

export default class App extends Component {
    state = {
        count:1
    }
    constructor(){
        super()
        console.log('App- constructor');
    }
    componentDidMount(){
        console.log('App- componentDidMount');
    }
    // componentDidUpdate 组件更新完成后执行
    componentDidUpdate(){
        console.log('App- componentDidUpdate');
    }
  render() {
    let {count} = this.state
    console.log('App- render');
    return (
      <div>
        <h3>App</h3>
        <p>count:{count}</p>
        <p><button onClick={()=>{
            this.setState({
                count:count + 1
            })
        }}>count+</button></p>
        
        <p><button onClick={()=>{
            // forceUpdate只有类组件有
            this.state.count += 1;
            this.forceUpdate();
        }}>强制更新</button></p>

        <p><button onClick={()=>{
            // 只要setState即便值不变，也会重新render和 componentDidUpdate
            this.setState({
                count:100
            })
        }}>更新固定值</button></p>
        <hr />
        <Son count={count}/>
      </div>
    )
  }
}
