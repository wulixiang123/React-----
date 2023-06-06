import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTotal } from '../../api/github'

const countSlice = createSlice({
    name: 'count',
    initialState: {
        num: 1
    },
    reducers: {
        addNum(state, { payload }) {
            state.num += payload
        },
        decNum(state, { payload }) {
            setTimeout(() => { // reducers中定义的方法，不支持异步操作
                state.num -= payload
            }, 1000)
        }
    },
    // extraReducers 中可以定义一些异步操作的方法
    // 先定义异步的actionCreator，使用 createAsyncThunk进行定义
    extraReducers: builder =>
        builder
            .addCase(asyncAddNum.pending, (state, action) => {
                console.log('asyncAddNum pending', action);
            })
            .addCase(asyncAddNum.fulfilled, (state, { payload }) => {
                state.num += payload
            })
            .addCase(asyncAddNum.rejected, (state, action) => {
                console.log('rejected', action)
            })
            .addCase(asyncAddTotal.fulfilled, (state, {payload})=>{
                console.log('addTotal payload: ', payload);
                state.num += payload
            })
})

// 创建异步的actionCreator，进行异步操作
export const asyncAddNum = createAsyncThunk('count/addNum', (payload) => {
    // 在此处可以进行异步操作，返回一个promise对象
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(payload);
            // reject('error123')
        }, 2000)
    })

    // return 123;  // 成功的promise  成功的结果值 {payload:123,type:'count/addNum/fulfilled'}
    // throw 555;
    // return Promise.reject(888);
})

// 异步发送请求或取total值，然后进行 + 
export const asyncAddTotal = createAsyncThunk('count/addTotal', async (payload)=>{
    let {total_count} = await getTotal(payload)
    return total_count
})

export default countSlice.reducer
export const { addNum, decNum } = countSlice.actions