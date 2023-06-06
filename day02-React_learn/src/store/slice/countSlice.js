// 1.引入createAsyncThunk解决异步操作
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'//第一步,引入切片
import { getTotal } from '../../api/github'
// count切片
const countSlice = createSlice({
    name:'count',//固定写法 goods是每一个方法中的type属性
    initialState:{//数据
        num:1
    },
    reducers:{//定义方法的容器
        addNum(state,{payload}){
            state.num += payload
        },
        decNum(state,{payload}){
            setTimeout(()=>{// reducers中定义的方法，不支持异步操作
                state.nub -= payload
            },1000)
        }
    },

    // 3.extraReducers 中可以定义一些异步操作的方法
    // 先定义异步的actionCreator，使用 createAsyncThunk进行定义
    extraReducers:builder =>
    builder
    .addCase(asyncAddNum.pending,(state,action)=>{
        console.log('pending',action);
    })
    .addCase(asyncAddNum.fulfilled,(state,{payload})=>{
        state.num += payload
    })
    .addCase(asyncAddNum.rejected,(state,action)=>{
        console.log('rejected',action);
    })


    
})
// 2.创建异步的actionCreator，进行异步操作
export const asyncAddNum = createAsyncThunk('count/addNum',(payload)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(payload)
            // reject('error')
        }, 2000);
    })
})
// 异步发送请求或取total值，然后进行 + 
export const asyncAddTotal = createAsyncThunk('count/addTotal', async (payload)=>{
    let {total_count} = await getTotal(payload)
    return total_count
})

export default countSlice.reducer
export const {addNum,decNum} = countSlice.actions