import {createSlice} from '@reduxjs/toolkit'
//商品切片
const goodsSlice = createSlice({
    name:'goods',//固定写法 goods是每一个方法中的type属性
    initialState:{//数据
        goodsList:[]
    },
    reducers:{//定义方法的容器
        addGoods(state,{payload}){
            state.goodsList = [...state.goodsList,{
                id:Math.random().toString(36).slice(2),
                ...payload
            }]
        }
    }
})
export const {addGoods} = goodsSlice.actions//解构方法存到actions中
export default goodsSlice.reducer //reducer接收当前状态和发生的动作作为输入，返回新状态作为输出。