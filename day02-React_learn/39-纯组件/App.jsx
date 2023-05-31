import React, { Component,PureComponent } from 'react'
import Son from './components/Son'

export default class App extends PureComponent {
    state = {
        count:99,
        msg:'atguigu'
    }
    render() {
        console.log('App render');
        let {count,msg} = this.state;
        return (
            <div>
                <h3>App</h3>
                <p>app state count：{count}</p>
                <p>app state msg: {msg}</p>
                <p><button onClick={()=>{
                    this.setState({
                        count:888
                    })
                }}>count = 888</button></p>

                <p><button onClick={()=>{
                    this.setState({
                        count:count + 1
                    })
                }}>count++</button></p>
                <hr />
                <Son count={count}/>
            </div>
        )
    }
}
