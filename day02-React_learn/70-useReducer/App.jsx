import React, { useReducer, useState } from 'react'
const initialState = { count: 0, msg: '哈哈' }

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {
                ...state,
                count: state.count + action.payload,
            }
        case 'decrement':
            return {
                ...state,
                count: state.count - 1,
            }
        case 'msg':
            return {
                ...state,
                msg:state.msg + action.payload
            }
        default:
            throw new Error()
    }
}
export default function App() {
    let [state, dispatch] = useReducer(reducer, initialState);
    console.log(state);
    let {count, msg} = state;
    return (
        <div>
            <p>count: {count}</p>
            <p>msg: {msg}</p>
            <p><button onClick={()=>{
                dispatch({type:'increment',payload:5})
            }}>count+</button></p>

            <p><button onClick={()=>{
                dispatch({type:'decrement'})
            }}>count--</button></p>

            <p><button onClick={()=>{
                dispatch({type:'msg',payload:'+'})
            }}>msg + </button></p>
        </div>
    )
}
