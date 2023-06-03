import React, { useEffect } from 'react'

export default function B() {
    useEffect(()=>{
        console.log('B is coming')
        return ()=>{
            console.log('B is gone')
        }
    })
    return (
        <div>B</div>
    )
}
