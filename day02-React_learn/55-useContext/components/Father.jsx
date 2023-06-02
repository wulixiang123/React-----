import React, { useContext } from 'react'
import context from '../context'
import Son from './Son';

export default function Father() {
  let data = useContext(context)
  console.log(data);
  return (
    <div>
      <h3>Father</h3>
      <Son></Son>
    </div>
  )
}
