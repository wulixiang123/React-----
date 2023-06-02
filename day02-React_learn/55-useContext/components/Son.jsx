import React, { useContext } from 'react'
import context from '../context'

export default function Son() {
    // let data = useContext(context)
    // console.log(data);

    let{username,age} = useContext(context)
  return (
    <div>
        <h3>Son</h3>
        <p>username:{username}</p>
        <p>age:{age}</p>
    </div>
  )
}
