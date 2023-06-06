import { createSlice } from '@reduxjs/toolkit'

// 1. 商品切片
const goodsSlice = createSlice({
    name: 'goods',
    initialState: {
        goodsList: [] // goods {id:xxx,gname:'小米',price:1999}
    },
    reducers: {
        // 添加购物车
        addGoods(state, { payload }) { // payload {gname:'xx', price:'xx'}
            state.goodsList = [...state.goodsList, {
                id: Math.random().toString(36).slice(2),
                ...payload
            }]
        }
    }
})
// 分别暴露 actionCreator
export const { addGoods } = goodsSlice.actions; // actionCreator获取完毕

// 默认暴露
export default goodsSlice.reducer

/**
 * 切片需要暴露的内容
 * 1. 默认暴露 reducer
 * 2. 分别暴露 actionCreator
 */