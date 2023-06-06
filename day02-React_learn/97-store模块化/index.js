/**
 * 添加商品、添加购物车练习
 * 1. 两个切片：商品切片、购物车切片
 * 2. 商品切片：添加商品
 * 3. 购物车切片： 添加购物车、修改购买数量
 * 
 */
import store from "./store";
import { addGoods } from "./store/slice/goodsSlice";
import { addCar } from "./store/slice/carSlice";

store.subscribe(()=>{//6.监听仓库
    console.log(store.getState());
})
//7.添加商品
store.dispatch(addGoods({gname:'小米手机',price:3999}))
store.dispatch(addGoods({gname:'华为手机',price:6999}))

// 添加到购物车
store.dispatch(addCar(store.getState().goods.goodsList[0]))
store.dispatch(addCar(store.getState().goods.goodsList[0]))
store.dispatch(addCar(store.getState().goods.goodsList[1]))