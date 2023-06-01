import React, { useEffect, useState } from 'react'
import usePosition from '../hook/usePosition'

export default function Cat() {
    let{x,y} = usePosition()
  return (
    <div style={{width:100,height:100,position:'absolute',left:x,top
:y,background:'skyblue'}}>Cat</div>
  )
}
