import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Message from "../pages/Message";
import News from "../pages/News";
import About from "../pages/About";
import PageNotFound from "../pages/PageNotFound";

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
                element:<Message/>
            },
            {
                path:'/home',
                element:<Navigate to='/home/news'/>
            }
        ]
    },
    {
        path:'/about',
        element:<About/>
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