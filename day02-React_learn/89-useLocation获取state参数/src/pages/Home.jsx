import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <h2>Home组件内容</h2>
            <div>
                <ul className="nav nav-tabs">
                    <li>
                        <NavLink to='/home/news' className='list-group-item'>News</NavLink>
                    </li>
                    <li>
                        {/* 简写 */}
                        <NavLink to='message' className='list-group-item'>Message</NavLink>
                    </li>
                </ul>
                {/* 二级路由展示位置 展示二级路由组件及三级.... 都是使用 <Outlet/> */}
                <Outlet/>
            </div>
        </>
    )
}