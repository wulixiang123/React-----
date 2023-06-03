import React from 'react'
import PubSub from 'pubsub-js'
export default function Son1() {
  return (
    <div>
      <h3>Son1</h3>
      <p><button onClick={()=>{
        PubSub.publish('fanfan','20年而已~')
      }}>发布凡凡的消息</button></p>
    </div>
  )
}
