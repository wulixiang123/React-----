# redux  toolkit

> redux toolkit: 官方提供的redux工具包
>
> 作用：对数据状态进行集中式管理
>
> react-redux：在react中更方便的使用redux

## 1. 基本使用

1. 下载

```
yarn add @reduxjs/toolkit
npm install @reduxjs/toolkit
```

2. src->index.js

```js
/**
 * 
 * redux toolkit 集中式状态管理
 * 
 */
// 1. 引入模块
import {
    createSlice, // 通过该函数创建数据状态管理模块
    configureStore // 生成仓库
} from '@reduxjs/toolkit'

//2.  创建切片：createSlice 函数返回的是一个对象
const countSlice = createSlice({
    // 模块名字
    name:'counter',
    // 初始状态值
    initialState:{
        count:1
    },
    // 提供方法用于操作状态
    reducers:{
        // 会在countSlice对象的actions属性上增加一个方法 increment
        // state:
        // 如果是第一次执行，那么state值为你的 initialState
        // 如果非第一次执行，那么state值为上一次操作的结果
        // action 是通过dispatch 执行时传递过来的action
        increment(state,action){
            // 在这里可以直接改
            // 1. 不需要对状态进行复制
            // 2. 不需要return
            state.count += action.payload
        }
    }
})

//3. 创建仓库
const store = configureStore({
    reducer:{
        counter:countSlice.reducer
    }
})
console.log(countSlice,store)

// 唯一正确的获取状态数据的途径，getState()返回一个对象，对象的结构与 configureStore传入的参数对象结构相同
// 状态与仓库的关系： state = store.getState()
console.log(store.getState()) // {counter:{count:1}}
console.log(store.getState().counter) // 获得counter模块的状态

//4.  获取状态
const state = store.getState()

// 5. 更改状态
// 错误的方式：不允许直接修改
// state.counter.count = 100;

// 正确的方式：store.dispatch()

// 获取操作counter仓库的 actionCreater 函数 increment. increment(值) 执行的结果会返回一个action {type:'片名/reducer中操作函数名',payload:值}
const {increment} = countSlice.actions
console.log(increment(2)) // {type:'counter/increment',payload:2}
store.dispatch(increment(1))
console.log(store.getState())

```

## 2. 添加商品

```jsx
import {
    createSlice,
    configureStore
} from '@reduxjs/toolkit'

const goodsSlice = createSlice({
    name:'goods',
    initialState:{
        goodsList:[]
    },
    reducers:{
        addGoods(state,{payload}){
            state.goodsList.unshift({
                id:Math.random().toString(30).slice(2),
                ...payload
            })
        }
    }
})

const store = configureStore({
    reducer: {
        goods:goodsSlice.reducer,
    }

})

const {addGoods} = goodsSlice.actions

// 可一个给state增加监听，当state发生变化的时候，执行回调函数
// 监听方法的返回值，是一个函数，执行可以取消监听
const unsubscribe = store.subscribe(()=>{
    console.log(store.getState())
})
store.dispatch(addGoods({
    name:'华为手机',
    price:1999,
    num:1
}))

unsubscribe()
store.dispatch(addGoods({
    name:'华为电脑',
    price:9990,
    num:1
}))
console.log(store.getState())

```

## 3. 添加购物车

```js
import {
    createSlice,
    configureStore
} from '@reduxjs/toolkit'
const goodsSlice = createSlice({
    name:'goods',
    initialState:{
        goodsList:[]
    },
    reducers:{
        addGoods(state,{payload}){
            state.goodsList.unshift({
                id:Math.random().toString(30).slice(2),
                ...payload
            })
        }
    }
})

// 添加购物车模块
const carSlice = createSlice({
    name:'car',
    initialState:{
        totalPrice:0,
        carList:[]
    },
    reducers:{
        addCar(state, {payload}){
            const info = state.carList.find(v=>{
                return v.id === payload.id
            })
            if(info){
                info.buyNum += 1
            }else{
                state.carList.unshift({
                    ...payload,
                    buyNum:1
                })
            }
            state.totalPrice =  state.carList.reduce((pre,cur)=>(pre + cur.buyNum * cur.price),0)
        }
    }
})
const store = configureStore({
    reducer: {
        goods:goodsSlice.reducer,
        car:carSlice.reducer
    }
})
const {addGoods} = goodsSlice.actions
const {addCar} = carSlice.actions

// 可一个给state增加监听，当state发生变化的时候，执行回调函数
// 监听方法的返回值，是一个函数，执行可以取消监听
const unsubscribe = store.subscribe(()=>{
    console.log(store.getState())
})
store.dispatch(addGoods({
    name:'华为手机',
    price:1999
}))

// unsubscribe()
store.dispatch(addGoods({
    name:'华为电脑',
    price:9990
}))

store.dispatch(addCar(store.getState().goods.goodsList[0]))
store.dispatch(addCar(store.getState().goods.goodsList[0]))
store.dispatch(addCar(store.getState().goods.goodsList[0]))
store.dispatch(addCar(store.getState().goods.goodsList[1]))
store.dispatch(addCar(store.getState().goods.goodsList[1]))

```

## 4. 拆分模块

### 1. 目录结构

```js
src
 |--store                     仓库
 |    |- slice                模块
 |    |    |- car.js          购物车模块
 |    |    |- goods.js        商品模块
 |    |- index.js             store
 |- index.js                  测试代码
```

- src->store->index.js

```js
import { configureStore } from "@reduxjs/toolkit"
import goods from './slice/goods'
import car from './slice/car'
const store = configureStore({
    reducer: {
        goods,
        car
    }
})
export default store
```

- src->store->slice->car.js

```js
import {
    createSlice
} from '@reduxjs/toolkit'

// 添加购物车模块
const carSlice = createSlice({
    name:'car',
    initialState:{
        totalPrice:0,
        carList:[]
    },
    reducers:{
        addCar(state, {payload}){
            const info = state.carList.find(v=>{
                return v.id === payload.id
            })
            if(info){
                info.buyNum += 1
            }else{
                state.carList.unshift({
                    ...payload,
                    buyNum:1
                })
            }
            state.totalPrice =  state.carList.reduce((pre,cur)=>(pre + cur.buyNum * cur.price),0)
        }
    }
})
export const {addCar} = carSlice.actions
export default carSlice.reduce
```

- src->store->slice->goods.js

```js
import {
    createSlice
} from '@reduxjs/toolkit'
const goodsSlice = createSlice({
    name:'goods',
    initialState:{
        goodsList:[]
    },
    reducers:{
        addGoods(state,{payload}){
            state.goodsList.unshift({
                id:Math.random().toString(30).slice(2),
                ...payload
            })
        }
    }
})
export const {addGoods} = goodsSlice.actions
export default goodsSlice.reducer
```

- src->index.js

```js
import store from './store'
import { addGoods } from './store/slice/goods'
import { addCar } from './store/slice/car'

const unsubscribe = store.subscribe(()=>{
    console.log(store.getState())
})
store.dispatch(addGoods({
    name:'华为手机',
    price:1999
}))

// unsubscribe()
store.dispatch(addGoods({
    name:'华为电脑',
    price:9990
}))

store.dispatch(addCar(store.getState().goods.goodsList[0]))
store.dispatch(addCar(store.getState().goods.goodsList[0]))
store.dispatch(addCar(store.getState().goods.goodsList[0]))
store.dispatch(addCar(store.getState().goods.goodsList[1]))
store.dispatch(addCar(store.getState().goods.goodsList[1]))
```

## 5. 视图操作添加商品购物车



# React-redux

>redux的问题：
>
>需要自己绑定监听来重新渲染整个组件
>
>应该有用到state数据的组件重新render
>
>解决：使用`react-redux`库

- 文档： https://react-redux.js.org
- react-redux是一个react插件
- 用来简化react中使用 redux
- 下载: npm i react-redux

## 使用步骤

1. 下载

   `npm i react-redux`

2. 通过Provider 向App及其所有后代组件提供 store

- src/index.js

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import store from './store/index.js'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
))
```

- src/App.jsx 组件中如何使用 react-redux ? 

```jsx
import React from 'react'
import { changeNum,asyncChange } from './store/slice/counter'

// useSelector 获取redux中的状态 
// useDispatch 获取dispatch函数,派发任务   
import { useSelector, useDispatch } from 'react-redux'
export default function App() {
    // let data = useSelector(函数)
    let data = useSelector(state=>state) // 获取redux中保存的所有状态数据
    //let data = useSelector(state=>state.counter) // 获取counter 切片的状态数据
    // 获取dispatch函数分发任务
    let dispatch = useDispatch()

    return (
        <div>
            <div>count:{data.counter.num}</div>
            <button onClick={()=>dispatch(changeNum(-1))}>-</button>
            <button onClick={()=>dispatch(changeNum(1))}>+</button>
            <button onClick={()=>dispatch(asyncChange(10))}>异步更新</button>
        </div>
    )
}

```



