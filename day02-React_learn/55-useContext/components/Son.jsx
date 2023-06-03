import React, { useContext } from 'react'
// 8.引入context
import context from '../context'
export default function Son() {
  // 9.使用解构方式获取value的数据
  let {username,age} = useContext(context)
  return (
    <div>
      <h4>Son</h4>
      <p>{username}</p>
      <p>{age}</p>
    </div>
  )
}
