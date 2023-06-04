import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import User from './pages/User'
export default function App() {
  return (
    <div>
        <h3>主页面显示效果</h3>
        {/* 
                4. 配置路由 path 和路由组件的映射关系
                   path 指定 路径
                   element： 指定该路径对应展示的路由组件
        */}
        <a href="/home">点我</a>
        <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/user' element={<User/>}></Route>
        </Routes>
    </div>
  )
}
