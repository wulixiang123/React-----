import {createSlice, configureStore} from '@reduxjs/toolkit'

const countSlice = createSlice({
    name:'count',
    initialState:{
        num:9
    },
    reducers:{
        addNum(state, action){//需求： {type:'count/addNum',payload:undefined}
            console.log('程序员 addNum 开始干活', action.payload)
            state.num += action.payload
        },
        decNum(state, {payload}){
            state.num -= payload
        }
    }
})

const {addNum, decNum} = countSlice.actions;// actionCreator 产品经理  创建需求

console.log(addNum(3));//{type: 'count/addNum', payload: 3}

console.log(decNum(5));//{type: 'count/decNum', payload: 5}


// 创建仓库
const store = configureStore({
    reducer:{
        count:countSlice.reducer
    }
})

// 获取仓库中所有的数据 getState
console.log(store.getState(), store.getState().count.num);

// 修改数据  仓库相当于是老板，老板     找      产品经理写一个需求文档，交给程序员干
//                            store  dispatch  actionCreator   action
store.dispatch(addNum(3)); // addNum(3) ==> {type:'count/addNum', payload:3}

console.log(store.getState());