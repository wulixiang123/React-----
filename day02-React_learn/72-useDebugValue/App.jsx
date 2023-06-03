import React from 'react'
import useFriendStatus from './hook/useFriendStatus'

export default function App() {
    let res = useFriendStatus();
    return (
        <div>App</div>
    )
}
