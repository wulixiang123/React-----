import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
// import Message from "../pages/Message";
import News from "../pages/News";
// import About from "../pages/About";
import PageNotFound from "../pages/PageNotFound";
import { Suspense, lazy } from "react";

const About = lazy(()=>import('../pages/About'))
const Message = lazy(()=>import('../pages/Message'))
const Detail = lazy(()=>import('../pages/Detail'))
const QueryText = lazy(()=>import('../pages/QueryTest'))
const StateText = lazy(()=>import('../pages/StateText'))

function load(Com){// 懒加载封装
    return(
        <Suspense fallback={<div>组件正在加载中...</div>}>
            <Com/>
        </Suspense>
    )
}
const routes = [// 1. 配置路由表
    {
        path:'/home',
        element:<Home/>,
        children:[
            {
                path:'/home/news',
                element:<News/>
            },
            {
                path:'message',
                element:load(Message),
                children:[
                    {
                        path:'detail/:id/:school',
                        element:load(Detail)
                    },
                    {
                        path:'query',
                        element:load(QueryText)
                    },
                    {
                        path:'state',
                        element:load(StateText)
                    }
                ]
            },
            {
                path:'/home',
                element:<Navigate to='/home/news'/>
            }
        ]
    },
    {
        path:'/about',
        element:load(About)
    },
    {
        index:true,
        // path:'/',
        element:<Navigate to='/home'/>
    },
    {
        path:'*',
        element:<PageNotFound/>
    }
]
export default routes