import React from 'react'

export default function Son({ count, msg, getCount }) {
    return (
        <div>
            <h3>Son</h3>
            <p>count: {count}</p>
            <p>msg: {msg}</p>
            <p><button onClick={()=>getCount(101)}>sendCount</button></p>
        </div>
    )
}
