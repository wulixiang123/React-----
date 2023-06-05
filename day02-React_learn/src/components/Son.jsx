import React, { Component } from 'react'

export default class Son extends Component {
    state = {
        name:'yuan bo',
        age:18
    }
    addValue(e){
        e.preventDefault();
        console.log(this.state.name);
        console.log(this.state.age);
    }
    addValue1(e){
        console.log(e.target.value);
        this.setState({
            name:e.target.value
        })
    }
    addValue2(e){
        console.log(e.target.value);
        this.setState({
            age:e.target.value
        })
    }
  render() {
    let {name,age} = this.state
    return (
      <div>
        <form onSubmit={this.addValue.bind(this)}>
            <input type="text" value={name} onChange={this.addValue1.bind(this)
            }/>
            {/* <input type="text" value={age} onChange={this.addValue2.bind(this)}/> */}
            <input type="text" value={age} onChange={
                this.addValue2.bind(this)}/>
                <button onClick={()=>{

                }}>点我</button>
        </form>
      </div>
    )
  }
}
