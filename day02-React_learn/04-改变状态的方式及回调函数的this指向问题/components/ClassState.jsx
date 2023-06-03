import React, {Component} from 'react'

class ClassState extends Component{
    // 定义状态的方式二
    state = {
        count:1000,
        msg:'atguigu'
    }
    
    addCount(){
        // console.log('addCount的this指向:',this);
        // this.state.count += 1;// 直接给state赋值修改，虽然可以改变状态数据，但是无法触发视图重新渲染【没有触发render函数再调用】
        // console.log(this.state.count);

        // this.setState
        this.setState({
            count:this.state.count + 1
        })
        /**
         * 事件回调函数 this指向问题：
         * 
         * 1. bind
         * 2. 包裹箭头函数
         * 
         * 3. 直接定义成箭头函数[不推荐]
         * 
         * 推荐原则：
         * 1. 性能：是否多占用了内存空间
         * 2. 是否可以传参
         * 
         */
    }

    addCount2 = ()=>{
        this.setState({
            count:this.state.count + 1
        })
    }

    render(){
        console.log('render run');
        console.log('this.state:',this.state);
        let{count,msg} = this.state;// 先解构再使用
        return(
            <div>
                <h3>Class类组件的状态数据读取</h3>
                <p>count:{this.state.count} - {count}</p>
                <p>msg:{this.state.msg} - {msg}</p>

                <p><button onClick={this.addCount.bind(this)}>count+</button></p>
                <p><button onClick={()=>this.addCount()}>count+</button></p>
                <p><button onClick={this.addCount2}>count+</button></p>
            </div>
        )
    }
}


export default ClassState;