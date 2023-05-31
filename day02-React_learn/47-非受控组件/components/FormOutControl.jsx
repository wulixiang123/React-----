import React, { useRef, useState } from 'react'

export default function FormOutControl() {
    let [username,setUserName] = useState('atguigu')
    let [pwd,setPwd] = useState('111')
    let usernameRef = useRef()
    let pwdRef = useRef()
    const save = (e) => {
        e.preventDefault()
        console.log('username:',usernameRef.current.value);
        console.log('pwd:',pwdRef.current.value);
    }
  return (
    <div>
        <form onSubmit={save}>
            <p>姓名: <input type="text" name="" ref={usernameRef} defaultValue={username}/></p>
            <p>密码: <input type="text" name="" ref={pwdRef} defaultValue={pwd}/></p>
            <p><button>保存</button></p>
        </form>
    </div>
  )
}
