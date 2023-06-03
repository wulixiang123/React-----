import React from 'react'
import Son2 from './Son2'
import { useEffect } from 'react'
import PubSub from 'pubsub-js'
export default function Father2() {
  useEffect(()=>{
    let fengId = PubSub.subscribe('fengfeng',(msg,data)=>{
      console.log('msg:',msg,'data:',data);
    })
    return () => {
      PubSub.unsubscribe(fengId)
    }
  },[])
  return (
    <div>
      <h2>Father2</h2>
      <Son2/>
    </div>
  )
}
