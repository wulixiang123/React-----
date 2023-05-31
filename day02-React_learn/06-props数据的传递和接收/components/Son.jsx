import React, {Component} from 'react'

export default class Son extends Component{
    render(){
        console.log('this.props:',this.props);
        let{count,msg} = this.props;//this.props接收
        return(
            <div>
                <h3>Son子组件</h3>
                <p>props count:{count}</p>
                <p>props msg:{msg}</p>
            </div>
        )
    }
}
// rcc可以快速创建上面代码~~~~