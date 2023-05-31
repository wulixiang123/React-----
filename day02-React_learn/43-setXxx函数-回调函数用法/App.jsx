import React, { useEffect, useState } from 'react'

export default function App() {
    let [msg,setMsg] = useState('atguigu')
    useEffect(()=>{
        setTimeout(()=>{
            setMsg((msg)=>{
                return msg + '*'
            })
        },2000)
    },[])
  return (
    <div>
        <p>msg:{msg}</p>
        <p><button onClick={()=>{
            setMsg(msg+'$')
        }}>msg+$</button></p>
    </div>
  )
}
