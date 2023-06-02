
import React from 'react'
import PubSub from 'pubsub-js'
export default function Son1() {
  return (
    <div>
      <h3>Son1</h3>
      <p><button onClick={()=>{
        PubSub.publish('fanfan','20年而已,很快就出来了!')
      }}>发布凡凡消息1</button></p>
    </div>
  )
}
