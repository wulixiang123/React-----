import React, { useState } from 'react'

export default function FormControl() {
    let [username,setUsername] = useState('atguigu');
    let [pwd, setPwd] = useState('123123')
    const changeUsername= (e)=>{
        setUsername(e.target.value);
    }
    const changePwd= (e)=>{
        setPwd(e.target.value);
    }

    const save = (e)=>{
        e.preventDefault();
        console.log('username: ', username);
        console.log('pwd: ', pwd);
    }
    return (
        <div>
            <form onSubmit={save}>
                <p>姓名: <input type="text" name="username" value={username} onChange={changeUsername}/></p>

                <p>密码: <input type="text" name="pwd" value={pwd} onChange={changePwd}/></p>
                <p><button>保存</button></p>
            </form>
        </div>
    )
}
