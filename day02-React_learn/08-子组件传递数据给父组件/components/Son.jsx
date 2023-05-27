import React, {Component} from 'react'

export default class Son extends Component{
    render(){
        console.log('this.props:',this.props);
        let{count,msg,addCount} = this.props;// 子组件中接收父组件传递的方法addCount
        return(
            <div>
                <h3>Son子组件</h3>
                <p>props count:{count}</p>
                <p>props msg:{msg}</p>

                <p><button onClick={()=>{
                    this.props.count += 1;// 直接修改props数据
                    // 报错：因为props数据是只读的，不可修改
                }}>props count++</button></p>
                {/** 子组件调用父组件传递的方法，并传递数据 */}
                <p><button onClick={()=>{
                    addCount(3)
                }}>子传父</button></p>
            </div>
        )
    }
}
// rcc可以快速创建上面代码~~~~