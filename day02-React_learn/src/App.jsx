import React from 'react'
import store from './store'
import { addNum } from './store/slice/countSlice'//拿到方法
export default function App() {
    let {num} = store.getState().count//拿到仓库中的值
  return (
    <div>
        <p>num:{num}</p>
        <p><button onClick={()=>{
            store.dispatch(addNum(5))
        }}>点我+5</button></p>
    </div>
  )
}
