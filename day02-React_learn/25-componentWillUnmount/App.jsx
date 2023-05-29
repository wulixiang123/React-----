import React, { Component } from 'react'
import Son from './components/Son';

export default class App extends Component {
    state = {
        count:1
    }
    constructor(){
        super();
        console.log('app constructor');
    }
    componentDidMount(){
        console.log('app componentDidMount');
    }
    // componentDidUpdate 组件更新完成后执行
    componentDidUpdate(){
        console.log('app componentDidUpdate');
    }
    render() {
        let {count} = this.state;
        console.log('app render');
        return (
            <div>
                <h3>App</h3>
                <p>count: {count}</p>
                <p><button onClick={()=>{
                    this.setState({
                        count: count + 1
                    })
                }}>count+</button></p>

                <p><button onClick={()=>{
                    // forceUpdate只有类组件有
                    this.setState.count += 1;
                    this.forceUpdate();
                }}>强制更新</button></p>

                <p><button onClick={()=>{
                    // 只要setState即便值不变，也会重新render和 componentDidUpdate
                    this.setState({
                        count:100
                    })
                }}>更新固定值</button></p>
                <hr />
                {count % 2 === 0 &&<Son count={count}/>}
            </div>
        )
    }
}
