import React, { useEffect } from 'react'
import Son1 from './Son1'
import PubSub from 'pubsub-js'
export default function Father1() {
  useEffect(()=>{
    let fanId = PubSub.subscribe('fanfan',(msg,data)=>{//mag消息名,data是数据
      console.log('msg:',msg,'data:',data);
    })
    return () => {
      PubSub.unsubscribe(fanId)//取消订阅
    }
  },[])
  return (
    <div>
      <h2>Father1</h2>
      <Son1/>
    </div>
  )
}
