//configureStore是创建仓库的必要条件
import {createSlice,configureStore} from '@reduxjs/toolkit'//下载并导入
const countSlice = createSlice({
    name:'count',//固定写法 count是每一个方法中的type属性
    initialState:{//数据
        num:1
    },
    reducers:{//定义方法的容器
        addNum(state,{payload}){//payload就是实参传过来的值
            state.num += payload
        },
        decNum(state,{payload}){
            state.num -= payload
        }
    }
})

console.log(countSlice);

const {addNum,decNum} = countSlice.actions//解构方法存到actions中

console.log('addNum(3):',addNum(3));
console.log('decNum(1)',decNum(1));

const store = configureStore({//创建仓库
    reducer:{
        count:countSlice.reducer
    }
})
// console.log(store);//store仓库中常用的方法有 1.getState() 2.dispatch
// console.log(store.getState());
// console.log(store.getState().count);
console.log(store.getState().count.num);//获取仓库的数据

store.dispatch(addNum(3))//store仓库中的dispatch方法接收一个方法并执行方法
console.log(store.getState().count);

//监听store仓库的变化,变化则触发回调
const unsubscribe = store.subscribe(()=>{
    console.log(store.getState(),'111');
})
store.dispatch(addNum(3))
store.dispatch(decNum(1))
unsubscribe()//取消监听
store.dispatch(addNum(100))