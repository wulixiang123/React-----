import { createSlice } from '@reduxjs/toolkit'
// 购物车切片
const carSlice = createSlice({
    name: 'car',
    initialState: {
        carList: []
    },
    reducers: {
        // 添加购物车
        addCar(state, { payload }) { // payload {id,gname,price}
            /**
             * 如果购物车中有该商品，只累加数量，没有该商品，创建
             * 购物车中有没有该商品，如何判断？
             */
            let index = state.carList.findIndex(item => item.id === payload.id)
            if (index === -1) {
                state.carList = [...state.carList, {
                    ...payload,
                    buyNum: 1 // 购买数量
                }]
            } else {
                state.carList[index].buyNum += 1
            }
        }
    }
})

export const { addCar } = carSlice.actions

export default carSlice.reducer