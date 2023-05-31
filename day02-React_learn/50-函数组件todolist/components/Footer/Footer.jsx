import React from "react";
import "./index.css";
const Footer = ({todos,checkAll,clearDone}) => {
    let total = todos.length
    let doneNum = todos.reduce((pre,cur)=>pre+cur.isDone,0)
    return (
        <div className="todo-footer">
            <label>
                <input type="checkbox" checked={total === doneNum && total>0} onChange={(e)=>checkAll(e.target.checked)}/>
            </label>
            <span>
                <span>已完成{doneNum}</span> / 全部{total}
            </span>
            <button className="btn btn-danger" onClick={clearDone}>清除已完成任务</button>
        </div>
    );
}
export default Footer