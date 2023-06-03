import React, { useMemo, useState } from 'react'

export default function WithMemo() {
    const [count,setCount] = useState(1)
    const [val,setVal] = useState('')

    const expensive = useMemo(()=>{
        console.log('compute');
        let sum = 0;
        for(let i = 0;i<count*100;i++){
            sum+=i
        }
        return sum
    },[count])
  return (
    <div>WithMemo</div>
  )
}
