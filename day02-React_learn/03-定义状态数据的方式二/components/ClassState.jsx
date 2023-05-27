import React, {Component} from 'react'

class ClassState extends Component{
    // 定义状态的方式二
    state = {
        count:1000,
        msg:'atguigu'
    }
    render(){
        console.log('this.state:',this.state);
        let{count,msg} = this.state;// 先解构再使用
        return(
            <div>
                <h3>Class类组件的状态数据读取</h3>
                <p>count:{this.state.count} - {count}</p>
                <p>msg:{this.state.msg} - {msg}</p>
            </div>
        )
    }
}


export default ClassState;