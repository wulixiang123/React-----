import goods from './slice/goodsSlice'
import car from './slice/carSlice'
import {configureStore} from '@reduxjs/toolkit'
const store = configureStore({//创建仓库
    reducer:{
        //reducer指定应用程序状态的变化方式。它是一个纯函数，
        //接收当前状态和发生的动作作为输入，返回新状态作为输出。
        goods,
        car
    }
})
export default store