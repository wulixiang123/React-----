import React from 'react'
import useSelfHook from './hook/userSelfHook'
export default function App() {
    let res = useSelfHook();
    console.log(res);
    return (
        <div>App</div>
    )
}
