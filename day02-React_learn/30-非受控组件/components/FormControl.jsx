import React, { Component,createRef } from 'react'

export default class FormControl extends Component {
    state = {
        username: 'atguigu',
        pwd: 123123
    }
    submitHandler(e) {
        e.preventDefault();// 阻止form表单提交的默认行为
        console.log('username: ', this.usernameRef.current.value);
        console.log('pwd: ', this.pwdRef.current.value);
    }
    usernameRef = createRef()
    pwdRef = createRef()
    render() {
        let { username, pwd } = this.state;
        return (
            <form onSubmit={this.submitHandler.bind(this)}>
                <p>用户名：<input type="text" ref={this.usernameRef} name="username" defaultValue={username}  /></p>
                <p>密码：<input type="text" ref={this.pwdRef} name="pwd" defaultValue={pwd} /></p>
                <p><button type='submit'>注册</button></p>
            </form>
        )
    }
}
