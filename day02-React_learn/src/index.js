//configureStore是创建仓库的必要条件
import {createSlice,configureStore} from '@reduxjs/toolkit'//下载并导入

/**
 * 添加商品、添加购物车练习
 * 1. 两个切片：商品切片、购物车切片
 * 2. 商品切片：添加商品
 * 3. 购物车切片： 添加购物车、修改购买数量
 * 
 */
//商品切片
const goodsSlice = createSlice({
    name:'goods',//固定写法 goods是每一个方法中的type属性
    initialState:{//数据
        goodsList:[]
    },
    reducers:{//定义方法的容器
        addGoods(state,{payload}){
            state.goodsList = [...state.goodsList,{
                id:Math.random().toString(36).slice(2),
                ...payload
            }]
        }
    }
})

const {addGoods} = goodsSlice.actions//解构方法存到actions中

// 购物车切片
const carSlice = createSlice({
    name:'Car',//必须写name,Car是每个方法中的type属性
    initialState:{//数据
        carList:[]
    },
    reducers:{//定义方法的容器,所有方法在此定义
        addCar(state,{payload}){
            //carList中的id等于我们传的数据的id
            let index = state.carList.findIndex(item=>item.id === payload.id)
            if(index === -1){//判断数据id是否为假,就是说有没有这个id,如果没有原封不动展示
                state.carList = [...state.carList,{
                    ...payload,
                    buyNam:1//购买数量
                }]
            }else{//否则+1
                state.carList[index].buyNam += 1
            }
            
        }
    }
})

const {addCar} = carSlice.actions//解构方法存到actions中

const store = configureStore({//创建仓库
    reducer:{
        //reducer指定应用程序状态的变化方式。它是一个纯函数，
        //接收当前状态和发生的动作作为输入，返回新状态作为输出。
        goods:goodsSlice.reducer,
        car:carSlice.reducer
    }
})

//监听store仓库的变化,变化则触发回调
store.subscribe(()=>{
    console.log(store.getState());
})
//添加商品
store.dispatch(addGoods({gname:'小米手机',price:1999}))
store.dispatch(addGoods({gname:'华为手机',price:2999}))
console.log(store.getState().goods.goodsList);

// 添加购物车
store.dispatch(addCar(store.getState().goods.goodsList[0]))
store.dispatch(addCar(store.getState().goods.goodsList[0]))
store.dispatch(addCar(store.getState().goods.goodsList[1]))