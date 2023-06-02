import React from 'react'
import context from './context'
import Father from './components/Father'

export default function App() {
  return (
    <div>
      <context.Provider value={{username:'atguigu',age:10}}>
        <Father/>
      </context.Provider>
    </div>
  )
}
