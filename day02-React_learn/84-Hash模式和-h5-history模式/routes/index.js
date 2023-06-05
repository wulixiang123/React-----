import Home from '../pages/Home'
import About from '../pages/About'
import PageNotFound from '../pages/PageNotFound'
import News from '../pages/News'
import Message from '../pages/Message'
import { Navigate } from 'react-router-dom'
// 1. 配置路由表
const routes = [
    {
        path: '/home',
        element: <Home />,
        children:[
            {
                path:'/home/news',
                element:<News/>
            },
            {
                path:'message',
                element:<Message/>
            },
            {
                path:'/home',
                element:<Navigate to='/home/news'/>
            }
        ]
    },
    {
        path: '/about',
        element: <About />
    },
    {
        index:true,
        // path:'/'
        element:<Navigate to='/home'/>
    },
    {
        path:'*',
        element:<PageNotFound/>
    }
]
export default routes;