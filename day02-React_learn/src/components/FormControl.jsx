import React, { useState } from 'react'

export default function FormControl() {
    let [username,setUserName] = useState('atguigu')
    let [pwd,setPwd] = useState('111')

    const changeUserName = (e) => {
        setUserName(e.target.value)
    }
    const changePwd = (e) => {
        setPwd(e.target.value)
    }

    // 方式一
    // const change = (e,fn) => {
    //     fn(e.target.value)
    // }


    // 方式二:高阶函数写法
    const change = (fn) => {
        return (e) =>{
            fn(e.target.value)
        }
    }

    const save = (e) => {
        e.preventDefault()
        console.log('username:',username);
        console.log('pwd:',pwd);
    }

  return (
    <div>
        <form onSubmit={save}>
            {/* <p>姓名:<input type="text" name="username" value={username} onChange={{changeUserName}}/></p>
            <p>姓名:<input type="text" name="pwd" value={pwd} onChange={{changePwd}}/></p> */}

            {/* 方式一: 普通函数传参写法*/}
            {/* <p>姓名:<input type="text" name="username" value={username} onChange={(e)=>change(e,setUserName)}/></p>
            <p>密码:<input type="text" name="pwd" value={pwd} onChange={(e)=>{change(e,setPwd)}}/></p> */}

            {/* 方式二: 高阶函数写法 */}
            <p>姓名: <input type="text" name="username" value={username} onChange={change(setUserName)}/></p>

            <p>密码: <input type="text" name="pwd" value={pwd} onChange={change(setPwd)}/></p>
            <p><button>保存</button></p>
        </form>
    </div>
  )
}
