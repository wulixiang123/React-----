import {createSlice} from '@reduxjs/toolkit'//第一步,引入切片
// count切片
const countSlice = createSlice({
    name:'count',//固定写法 goods是每一个方法中的type属性
    initialState:{//数据
        num:1
    },
    reducers:{//定义方法的容器
        addNum(state,{payload}){
            state.num += payload
        }
    }
})
export default countSlice.reducer
export const {addNum} = countSlice.actions