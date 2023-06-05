import React from 'react'
import { useLocation } from 'react-router-dom'

export default function StateText() {
    let {state:{id,school}} = useLocation()
  return (
    <div>
        <h3>State参数的接收</h3>
        <p>id:{id}</p>
        <p>school:{school}</p>
    </div>
  )
}
