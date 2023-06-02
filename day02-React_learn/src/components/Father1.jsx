import React, { useEffect } from 'react'
import PubSub from 'pubsub-js'
import Son1 from './Son1';
export default function Father1() {
  useEffect(()=>{
    let fanId = PubSub.subscribe('fanfan',(msg,data)=>{
      console.log('Father1 mag:',msg);
      console.log('Father1 data:',data);
    })
    return ()=>{
      PubSub.unsubscribe(fanId)
    }
  })
  return (
    <div>
      <h3>Father1</h3>
      <Son1/>
    </div>
  )
}
