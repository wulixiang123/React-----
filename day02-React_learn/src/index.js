import {createSlice,configureStore}from'@reduxjs/toolkit'//1.下载并引入

const countSlice = createSlice({//@reduxjs/toolkit里面的createSlice方法
    name:'count',
    initialState:{
        num:9
    },
    reducers:{
        addNum(state,action){
            console.log('开始干活',action.payload);
            state.num += action.payload
        },
        decNum(state,{payload}){
            state.num -= payload
        }
    }
})

const {addNum,decNum} = countSlice.actions

console.log(addNum(3));
console.log(decNum(5));
const store = configureStore({
    reducer:{
        count:countSlice.reducer
    }
})

console.log(store.getState(),store.getState().count.num);

store.dispatch(addNum(3));
store.dispatch(decNum(5))
console.log(store.getState());