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
      <ul>
        <li><a href="/login">登录</a></li>
        <li><a href="/user">用户中心</a></li>
        <li><a href="/home">首页</a></li>
      </ul>

      <ul>
        <li><NavLink to='/login'>登录</NavLink></li>
        <li><NavLink to='/user'>用户中心</NavLink></li>
        <li><NavLink to='/home'>首页</NavLink></li>
      </ul>

      <ul>
        <li><Link to='/login'>登录</Link></li>
        <li><Link to='/user'>用户中心</Link></li>
        <li><Link to='/home'>登录</Link></li>
      </ul>

      <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/user' element={<User />}></Route>
            </Routes>
    </div>
  )
}
