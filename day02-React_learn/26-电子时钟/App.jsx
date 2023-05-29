import React, { Component } from 'react'
import Son from './components/Son'

export default class App extends Component {
    state = {
        isShow:true
    }
  render() {
    let {isShow} = this.state
    return (
        <>
            <button onClick={()=>{
                this.setState({
                    isShow:!isShow
                })
            }}>挂载/卸载</button>
            {isShow && <Son/>}
        </>
    )
  }
}
