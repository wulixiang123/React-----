import React, { useEffect } from 'react'
import PubSub from 'pubsub-js'
import Father1 from './components/Father1';
import Father2 from './components/Father2';
export default function App() {
  useEffect(()=>{
    let fanId = PubSub.subscribe('fanfan',(msg,data)=>{
      console.log('App msg:',msg);
      console.log('App data:',data);
    })

    let fengId = PubSub.subscribe('fengfeng',(msg,data)=>{
      console.log('App msg:',msg);
      console.log('App data:',data);
    })
    return () => {
      PubSub.unsubscribe(fanId)
      PubSub.unsubscribe(fengId)
    }
  },[])
  return (
    <div>
      <h3>App</h3>
      <p><button onClick={()=>{
        PubSub.unsubscribe('fanfan');
      }}>取消凡凡消息</button></p>

      <p><button onClick={()=>{
        PubSub.clearAllSubscriptions();
      }}>封杀所有艺人</button></p>
      <hr />
      <Father1/>
      <Father2/>
    </div>
  )
}
