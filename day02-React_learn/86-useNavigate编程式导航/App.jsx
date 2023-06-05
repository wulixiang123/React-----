import React from 'react'
import { NavLink, useNavigate, useRoutes } from 'react-router-dom'
// 2. 导入路由表
import routes from './routes'

export default function App() {
    const navigate = useNavigate();// 创建navigate函数
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
                    <div>
                        <button onClick={()=>{
                            // 编程式导航可以加入js逻辑，进行有条件的跳转
                            // if(localStorage.getItem('token')) {
                            //     navigate('/about')
                            // }
                            navigate('/about')
                        }}>About history</button>
                        <button onClick={()=>{
                            navigate('/about', {replace:true}) // 替换掉当前的历史记录
                        }}>About replace true</button>

                        <button onClick={()=>navigate(1)}>前进</button>
                        <button onClick={()=>navigate(-1)}>后退</button>

                        <button onClick={()=>navigate(2)}>前进2步</button>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="panel">
                        <div className="panel-body">
                            {/* 3. 使用useRoutes 激活路由表 */}
                            {useRoutes(routes)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
