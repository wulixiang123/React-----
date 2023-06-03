import React from 'react'
import WithMemo from './components/WithMemo'
import WithOutMemo from './components/WithOutMemo'
export default function App() {
  return (
    <div>
        <WithMemo/>
        <hr />
        <WithOutMemo/>
    </div>
  )
}
