import React, { useEffect, useState } from 'react'

export default function App() {
    let [msg,setMsg] = useState('atguigu')//msg的值为atguigu,setMsg修改msg的值
    useEffect(()=>{
        setTimeout(()=>{
            /**
             * setMsg 参数可以是一个回调函数，回调函数的参数能够
             * 获取到 useState中缓存的最新的状态值，
             * 回调函数的返回值，就是设置的最新的 msg状态值
             */


            // 方式一
            //setMsg(msg + '-');// 说明此处的msg 只能取到初始值 atguigu
            // 方式二
            setMsg((msg)=>{//这里必须要使用箭头函数 不然拿不到最新的被修改过的值
                return msg + '*'
            })
        },2000)
    },[])//挂载阶段
  return (
    <div>
        <p>msg:{msg}</p>
        <p><button onClick={()=>{
            setMsg(msg+'$')
        }}>msg+$</button></p>
    </div>
  )
}
