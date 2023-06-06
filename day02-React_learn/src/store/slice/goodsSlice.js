import {createSlice} from '@reduxjs/toolkit'
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

export const {addGoods} = goodsSlice.actions;//4.获取商品
// export default goodsSlice
export default goodsSlice.reducer
