import React, { Component } from 'react'
import './index.css'
export default class Header extends Component {
    sendTitle(e){
        // 判断是否按的是回车
        if(e.code !== 'Enter') return;
        //执行到这里就是按的回车
        // 获取文本框内容
        let title = e.target.value.trim();
        console.log(title)
        if(!title) return ;// 什么都没有输入
        // 3. 接收父组件传递的方法
        let {addTodo} = this.props;
        // 4. 调用方法并传递参数
        addTodo(title);

        // 清除文本框的内容
        e.target.value = '';
    }
    render() {

        return (
            <div className="todo-header">
                <input type="text" onKeyUp={this.sendTitle.bind(this)} placeholder="请输入你的任务名称，按回车键确认" />
            </div>
        )
    }
}
