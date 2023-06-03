import React, { useRef, useState } from 'react'
import request from './http'
import './App.css'
import Main from './components/Main'
export default function App() {
    let [first, setFirst] = useState(true)// 是否是第一次访问
    let [loading, setLoading] = useState(false)// 请求中
    let [users, setUsers] = useState([])// 用户数据

    const keywordRef = useRef()
    async function getUsers(){
        // 通过ref获取文本框的值
        let keyword = keywordRef.current.value.trim();
        if(!keyword) return; // 如果没有输入，不进行搜索
        // 
        setFirst(false);// 有搜索了，就不是第一次访问了，设置为false
        setLoading(true);// 开启loading
        let {items} = await request.get('/search/users', {
            params:{
                q:keyword
            }
        })
        setUsers(items);// 设置用户状态
        setLoading(false);// 关闭loading
    }
    return (
        <>
            <div id="app">
                <div className="container">
                    <section className="jumbotron">
                        <h3 className="jumbotron-heading">Search Github Users</h3>
                        <div>
                            <input ref={keywordRef} type="text" placeholder="enter the name you search" />
                            <button onClick={getUsers}>Search</button>
                        </div>
                    </section>
                    <Main first={first} loading={loading} users={users}/>
                </div>
            </div>
        </>
    )
}
