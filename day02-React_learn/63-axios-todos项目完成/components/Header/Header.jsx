import React from 'react'
import './index.css'
export default function Header({createTodo}) {
    function sendTitle(e){
        if(e.code !== 'Enter') return;
        let title = e.target.value.trim();
        if(!title) return;
        createTodo(title);
        e.target.value = ''
    }
    return (
        <div className="todo-header">
            <input type="text" onKeyUp={sendTitle} placeholder="请输入你的任务名称，按回车键确认" />
        </div>
    )
}
