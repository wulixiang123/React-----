import { Suspense, lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import News from '../pages/News'
import PageNotFound from '../pages/PageNotFound'

// 按需加载
// import About from '../pages/About'
// import Message from '../pages/Message'
const About = lazy(() => import('../pages/About'))
const Message = lazy(() => import('../pages/Message'))

// 懒加载封装
function load(Com) {
    return (
        <Suspense fallback={<div>组件正在加载中....</div>}>
            <Com />
        </Suspense>
    )
}

// 1. 配置路由表
const routes = [
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: '/home/news',
                element: <News />
            },
            {
                path: 'message',
                element: load(Message)
            },
            {
                path: '/home',
                element: <Navigate to='/home/news' />
            }
        ]
    },
    {
        path: '/about',
        element: load(About)
    },
    {
        index: true,
        // path:'/'
        element: <Navigate to='/home' />
    },
    {
        path: '*',
        element: <PageNotFound />
    }
]
export default routes;