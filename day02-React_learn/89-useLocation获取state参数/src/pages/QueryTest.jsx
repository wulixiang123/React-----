import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function QueryTest() {
    let [query,setQuery] = useSearchParams()
    let id = query.get('id')
    let school = query.get('school')
  return (
    <div>
        <h3>Query参数的接收</h3>
        <p>id:{id}</p>
        <p>school:{school}</p>

        <p><button onClick={()=>{
            setQuery('id=3&school=atguigu')
        }}>设置query参数</button></p>
    </div>
  )
}
