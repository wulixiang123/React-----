import React from 'react'
import { NavLink, useRoutes } from 'react-router-dom'
import routes from './routes'
import './App.css'
export default function App() {
    return (
        <div>
            <ul>
                <li><NavLink to='/addgoods'>添加商品</NavLink></li>
                <li><NavLink to='/goodslist'>商品列表</NavLink></li>
                <li><NavLink to='/carlist'>购物车列表</NavLink></li>
            </ul>
            {useRoutes(routes)}
        </div>
    )
}
