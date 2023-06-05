import React from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Message from './pages/Message'
import News from './pages/News'
import PageNotFound from './pages/PageNotFound'

export default function App() {
    return (
        <>
            <div className="row">
                <div className="col-xs-offset-2 col-xs-8">
                    <div className="page-header"><h2>React Router Demo</h2></div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-2 col-xs-offset-2">
                    <div className="list-group">
                        <NavLink className='list-group-item' to='/about'>About</NavLink>
                        <NavLink className='list-group-item' to='/home'>Home</NavLink>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="panel">
                        <div className="panel-body">
                            <Routes>
                                <Route path='/about' element={<About/>}></Route>
                                <Route path='/home' element={<Home/>}>
                                    <Route path='/home/news' element={<News/>}></Route>
                                    {/* 
                                        简写：可以省略一级路由的路径前缀，但是前面没有 / 
                                    */}
                                    <Route path='message' element={<Message/>}></Route>
                                    {/* 二级路由默认展示路由重定向 news */}
                                    <Route path='/home' element={<Navigate to='/home/news'/>}></Route>
                                </Route>
                                <Route index element={<Navigate to='/home' />} />
                                <Route path='*' element={<PageNotFound/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
