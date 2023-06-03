import React, { useEffect } from 'react'
import Father1 from './components/Father1'
import Father2 from './components/Father2'
import PubSub from 'pubsub-js'
export default function App() {
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
      <h1>App</h1>
      <p><button onClick={()=>{
        PubSub.unsubscribe('fanfan')
      }}>取消凡凡的订阅</button></p>

      <p><button onClick={()=>{
        PubSub.clearAllSubscriptions()
      }}>封杀所有艺人!!</button></p>
      <hr />
      <Father1/>
      <Father2/>
    </div>
  )
}
