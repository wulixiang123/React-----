import React, { useState } from 'react'
import Son from './components/Son'

export default function App() {
    let [age,setAge] = useState(20)
  return (
    <div>
        <h3>App</h3>
        <p>App state age:{age}</p>
        <p><button onClick={()=>setAge(age+1)}>age++</button></p>
        <hr />
        <Son/>
    </div>
  )
}
