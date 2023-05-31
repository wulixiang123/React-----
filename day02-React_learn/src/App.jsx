import React, { useState } from 'react'
import TimeRunner  from './components/TimeRunner'
export default function App() {
    let [isShow,setIsShow] = useState(true)
  return (
    <div>
        <button onClick={()=>setIsShow(!isShow)}>切换</button>
        {isShow&&<TimeRunner/>}
    </div>
  )
}
