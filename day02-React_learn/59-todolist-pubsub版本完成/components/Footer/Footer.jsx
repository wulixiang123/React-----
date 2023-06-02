import React, { Component, useContext } from 'react'
import PubSub from 'pubsub-js'
import context from '../../context'
import './index.css'
const Footer = () => {
    let todos = useContext(context)
    let total = todos.length;
    let doneNum = todos.reduce((pre,cur)=>pre+cur.isDone, 0);
    return (
        <div className="todo-footer">
            <label>
                <input type="checkbox" onChange={(e)=>{
                    PubSub.publish('checkAll', e.target.checked)
                }} checked={doneNum === total && total > 0}/>
            </label>
            <span>
                <span>已完成 {doneNum}</span> / 全部 {total}
            </span>
            <button className="btn btn-danger" onClick={()=>{
                PubSub.publish('deleteIsDone')
            }}>清除已完成任务</button>
        </div>
    )
}
export default Footer
