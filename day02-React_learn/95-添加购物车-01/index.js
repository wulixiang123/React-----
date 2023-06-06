/**
 * 添加商品、添加购物车练习
 * 1. 两个切片：商品切片、购物车切片
 * 2. 商品切片：添加商品
 * 3. 购物车切片： 添加购物车、修改购买数量
 * 
 */
import {createSlice, configureStore} from '@reduxjs/toolkit'//1.引入

const goodsSlice = createSlice({//2.商品切片
    name:'goods',
    initialState:{
        goodsList:[]
    },
    reducers:{
        addGoods(state,{payload}){//3.添加商品
            state.goodsList = [...state.goodsList,{
                id:Math.random().toString(36).slice(2),
                ...payload
            }]
        }
    }
})

const {addGoods} = goodsSlice.actions;//4.获取商品

const carSlice = createSlice({
    name:'car',
    initialState:{
        carList:[]
    },
    reducers:{
        addCar(state,{payload}){
            state.carList = [...state.carList,{
                ...payload,
                buyNum:1//购买数量
            }]
        }
    }
})

const {addCar} = carSlice.actions

const store = configureStore({//5.创建仓库
    reducer:{
        goods:goodsSlice.reducer,
        car:carSlice.reducer
    }
})

store.subscribe(()=>{//6.监听仓库
    console.log(store.getState());
})
//7.添加商品
store.dispatch(addGoods({gname:'小米手机',price:3999}))
store.dispatch(addGoods({gname:'华为手机',price:6999}))

// 添加到购物车
store.dispatch(addCar(store.getState().goods.goodsList[0]))
store.dispatch(addCar(store.getState().goods.goodsList[1]))