import React, { Component } from 'react'
import Son from './components/Son'

export default class App extends Component {
    state = {
        msg: 'atguigu'
    }
    render() {
        console.log('App render');
        let { msg } = this.state;
        return <>
            <h3>App</h3>
            <p>state msg: {msg}</p>
            <p><button onClick={() => {
                this.setState({
                    msg: msg + '!'
                })
            }}>msg + '!'</button></p>

            <p><button onClick={() => {
                this.setState({
                    msg: '尚硅谷'
                })
            }}>msg = '尚硅谷'</button></p>
            <hr />
            <Son msg={msg} />
        </>
    }
}
