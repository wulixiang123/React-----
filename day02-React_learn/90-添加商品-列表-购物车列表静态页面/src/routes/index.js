import { Navigate } from "react-router-dom";
import AddGoods from "../pages/AddGoods";
import CarList from "../pages/CarList";
import GoodsList from "../pages/GoodsList";

const routes = [
    {
        path:'/addgoods',
        element:<AddGoods/>
    },
    {
        path:'/goodslist',
        element:<GoodsList/>
    },
    {
        path:'/carlist',
        element:<CarList/>
    },
    {
        index:true,
        element:<Navigate to='/addgoods'/>
    }
]

export default routes;