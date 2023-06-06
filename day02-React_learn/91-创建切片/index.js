// 1. 导入创建切片的函数
import {createSlice} from '@reduxjs/toolkit'

// 2. 创建切片
const countSlice = createSlice({
    name:'count',// 切片名
    initialState:{// 切片数据
        num:1
    },
    reducers:{ // 程序员之家，程序员操作数据,本质就是方法
        /**
         * 
         * @param {*} state 切片状态数据
         * @param {*} action 需求 {type:'切片名/方法名', payload:操作数据的参数}
         *                        例如：{type:'count/addNum',payload:xxx}
         * 
         *  action中的type不是给程序员用的，而是redux自己使用的。
         *  我们一般只使用 action中的payload值，所以一般直接解构payload使用
         * 
         * 每在reducers配置对象中创建一个程序员方法，会自动匹配一个同名的产品经理 action Creator. actionCreator在哪里呢？ 在切片的actions属性上
         */
        addNum(state,action){ 
            // 直接给state中的状态赋值，即可改变切片数据
            state.num += 1;
        },
        decNum(state, {payload}){
            state.num -= payload
        }
    }
})

console.log(countSlice);

// 产品经理解构出来
const {addNum, decNum} = countSlice.actions; 
// addNum decNum 身份是 actionCreator
// actionCreator 一执行，就会创建出一个action对象

console.log('addNum(5): ',addNum(5));
console.log('decNum(3): ',decNum(3));
