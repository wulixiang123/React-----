import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
// import Message from "../pages/Message";
import News from "../pages/News";
// import About from "../pages/About";
import PageNotFound from "../pages/PageNotFound";
import { Suspense, lazy } from "react";

const About = lazy(()=>import('../pages/About'))
const Message = lazy(()=>import('../pages/Message'))


const routes = [
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
                element:<Suspense fallback={<div>组件正在加载中...</div>}>
                            <Message/>
                        </Suspense>
            },
            {
                path:'/home',
                element:<Navigate to='/home/news'/>
            }
        ]
    },
    {
        path:'/about',
        element:<Suspense fallback={<div>组件正在加载中...</div>}>
                    <About/>
                </Suspense>
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