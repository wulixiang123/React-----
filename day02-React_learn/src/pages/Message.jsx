import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Message() {
    return (
        <>
        <ul>
            <li>
                {/* <a href="/message1">message001</a>&nbsp;&nbsp; */}
                <NavLink to='detail/1/atguigu'>params参数</NavLink>
            </li>
            <li>
                {/* <a href="/message2">message002</a>&nbsp;&nbsp; */}
                <NavLink to='query?id=2&school=sgg'>query参数</NavLink>
            </li>
            <li>
                <a href="/message/3">message003</a>&nbsp;&nbsp;
            </li>
        </ul>
        <Outlet/>
        </>
    )
}
