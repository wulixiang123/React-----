import store from "./store";
import { addGoods } from "./store/slice/goodsSlice";
import { addCar } from "./store/slice/carSlice";
//监听store仓库的变化,变化则触发回调
store.subscribe(()=>{
    console.log(store.getState());
})
//添加商品
store.dispatch(addGoods({gname:'小米手机',price:1999}))
store.dispatch(addGoods({gname:'华为手机',price:2999}))
console.log(store.getState().goods.goodsList);

// 添加购物车
store.dispatch(addCar(store.getState().goods.goodsList[0]))
store.dispatch(addCar(store.getState().goods.goodsList[0]))
store.dispatch(addCar(store.getState().goods.goodsList[1]))