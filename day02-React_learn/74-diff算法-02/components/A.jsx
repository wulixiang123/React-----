import React, { useEffect } from 'react'

export default function A({school}) {
    useEffect(()=>{
        console.log('A is coming')
        return ()=>{
            console.log('A is gone')
        }
    })
    return (
        <div>
            <p>school: {school}</p>
        </div>
    )
}
