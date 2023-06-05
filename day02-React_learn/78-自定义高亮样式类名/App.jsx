import React from 'react'
import { Routes, Route, NavLink, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import User from './pages/User'
import './App.css'
export default function App() {
    return (
        <div>
            <h3>App</h3>
            {/* <ul>
                <li><a href="/login">登录</a></li>
                <li><a href="/user">用户中心</a></li>
                <li><a href="/home">首页</a></li>
            </ul> */}

            {/* NavLink 激活的路由有高亮样式类名 active【默认】 */}
            <ul>
                <li><NavLink to='/login'>登录</NavLink></li>
                <li><NavLink to='/user'>用户中心</NavLink></li>
                <li><NavLink to='/home'>首页</NavLink></li>
            </ul>
            {/* Link可以生成无刷新的跳转链接，但是没有高亮样式类名 */}
            <ul>
                <li><Link to='/login'>登录</Link></li>
                <li><Link to='/user'>用户中心</Link></li>
                <li><Link to='/home'>首页</Link></li>
            </ul>

            <hr />
            <ul>
                <li><NavLink className={(obj) => {
                    // console.log('className', obj)
                    return obj.isActive ? 'myselfActive' : ''
                }} to='/login'>登录</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? 'myselfActive' : ''} to='/user'>用户中心</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? 'myselfActive' : ''} to='/home'>首页</NavLink></li>
            </ul>
            {/* 
                4. 配置路由 path 和路由组件的映射关系
                   path 指定 路径
                   element： 指定该路径对应展示的路由组件
            */}
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/user' element={<User />}></Route>
            </Routes>
        </div>
    )
}
