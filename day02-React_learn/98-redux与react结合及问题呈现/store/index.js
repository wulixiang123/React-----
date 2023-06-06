import {configureStore} from '@reduxjs/toolkit'//创建仓库存储数据
import count from './slice/countSlice'//引入数据
const store = configureStore({//创建仓库
    reducer:{
        //reducer指定应用程序状态的变化方式。它是一个纯函数，
        //接收当前状态和发生的动作作为输入，返回新状态作为输出。
       count
    }
})
export default store