import {createSlice} from '@reduxjs/toolkit'//下载并导入
const countSlice = createSlice({
    name:'count',//固定写法 count是每一个方法中的type属性
    initialState:{//数据
        num:1
    },
    reducers:{//定义方法的容器
        addNum(state,{payload}){
            state.num += payload
        },
        decNum(state,{payload}){
            state.num -= payload
        }
    }
})

console.log(countSlice);

const {addNum,decNum} = countSlice.actions//解构方法存到actions中

console.log('addNum(1):',addNum(3));
console.log('decNum(1)',decNum(1));