import React, { useEffect, useState } from 'react'

export default function Cat() {
    let [x,setX] = useState(150)
    let [y,setY] = useState(150)
    
    useEffect(()=>{
        const move = (e) => {
            setX(e.clientX)
            setY(e.clientY)
        }
        window.addEventListener('mousemove',move)
        return () => {
            window.removeEventListener('mousemove',move)
        }
    },[])
  return (
    <div style={{width:100,height:100,position:'absolute',left:x,top
:y,background:'skyblue'}}>Cat</div>
  )
}
