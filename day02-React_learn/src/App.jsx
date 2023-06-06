import React from 'react'
import store from './store'
import {addNum} from './store/slice/countSlice'
export default function App() {
    let {num} = store.getState().count
  return (
    <div>
        <p>num:{num}</p>
        <p><button onClick={()=>{
            store.dispatch(addNum(1))
        }}>num+1</button></p>
    </div>
  )
}
