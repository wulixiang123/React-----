import React, { Component } from 'react'

export default class FormControl extends Component {
    /**
     *  1. 什么叫受控组件？
     *     表单元素的值，受到状态数据的控制
     * 
     *  - 状态数据如何渲染到表单页面
     *  - 如何获取最新用户输入的内容
     */
    state = {
        username: 'atguigu',
        pwd: 123123
    }
    submitHandler(e) {
        e.preventDefault();// 阻止form表单提交的默认行为
        // 受控组件，数据已经跟状态绑定了，用户最新的输入通过状态数据获取即可
        console.log('username:', this.state.username);
        console.log('pwd: ', this.state.pwd);
    }

    /**
     * 改变username的值的change函数
     * 
     */
    // changeUsername(e) {
    //     console.log(e.target.name);
    //     // 使用用户最新的输入，设置username状态即可
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // }
    // changePwd(e) {
    //     console.log(e.target.name);
    //     // 使用用户最新的输入，设置username状态即可
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        let { username, pwd } = this.state;
        return (
            <form onSubmit={this.submitHandler.bind(this)}>
                <p>用户名：<input type="text" name="username" value={username} onChange={this.change.bind(this)} /></p>
                <p>密码：<input type="text" name="pwd" value={pwd} onChange={this.change.bind(this)} /></p>
                <p><button type='submit'>注册</button></p>
            </form>
        )
    }
}
