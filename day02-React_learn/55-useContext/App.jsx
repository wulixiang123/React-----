import React from 'react'
// 3.引入context
import context from './context'
// 4.引入Father
import Father from './components/Father'
export default function App() {
  return (
    <div>
      {/* 5.使用<context.Provider>包裹后代组件或使用value传递数据 */}
      <context.Provider value = {{username:'yb',age:18}}>
        <Father/>
      </context.Provider>
    </div>
  )
}
