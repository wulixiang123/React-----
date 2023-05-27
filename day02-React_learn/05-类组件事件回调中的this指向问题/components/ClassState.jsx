import React, {Component} from 'react'

export default class Classtate extends Component{
    state = {
        count:100,
        msg:'尚硅谷'
    }
    click1(){
        // this.setState 运行后会产生两个严重后果
        // 1. 状态数据被改变了
        // 2. render函数重新调用

        // 报错：原因是事件的回调函数是 window调用的，所以this本身在严格模式下是指向undefined
        this.setState({
            count: this.state.count + 1
        })
    }

    click2(){
        this.setState({
            count:this.state.count + 1
        })
    }

    constructor(){
        super();
        this.click3 = this.click3.bind(this)
    }

    click3(){
        this.setState({
            count:this.state.count + 1
        })
    }

    click4(){
        this.setState({
            count:this.state.count + 1
        })
    }

    click5 = () => {
        this.setState({
            count:this.state.count + 1
        })
    }
    render(){
        console.log('render run');
        let {count,msg} = this.state;
        return(
            <div>
                <p>count:{count}</p>
                <p>msg:{msg}</p>

                <p><button onClick={this.click1}>count+ 错误</button></p>
                <p><button onClick={this.click2.bind(this)}>count+bind</button></p>
                <p><button onClick={this.click3}>count+bind+constructor</button></p>
                <p><button onClick={()=>this.click4()}>箭头函数</button></p>
                <p> <button onClick={this.click5}>直接定义成箭头函数</button></p>
            </div>
        )
    }
}