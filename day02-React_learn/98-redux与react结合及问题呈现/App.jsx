import React from 'react'
import store from './store'
import { addNum } from './store/slice/countSlice';
export default function App() {
    console.log('App run'); // setState newProps forceUpdate
    let {num} = store.getState().count;
    return (
        <div>
            <p>num: {num}</p>
            <p><button onClick={()=>{
                store.dispatch(addNum(3))
            }}>num++</button></p>
        </div>
    )
}
