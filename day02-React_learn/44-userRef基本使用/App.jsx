import React, { useRef } from 'react'

export default function App() {
    let inputRef = useRef('aaa')
    console.log('inputRef:',inputRef);
  return (
    <div>
        <input type="text" name="" id="" ref={inputRef}/>
        <button onClick={()=>{
            console.log(inputRef);
            console.log(inputRef.current);
            console.log(inputRef.current.value);
        }}>get Ref</button>
    </div>
  )
}
