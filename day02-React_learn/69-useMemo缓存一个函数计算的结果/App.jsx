import React from 'react'
import WithMemo from './components/WithMemo'
import WithoutMemo from './components/WithOutMemo'

export default function App() {
    return (
        <div>
            <WithoutMemo/>
            <hr />
            <WithMemo/>
        </div>
    )
}
