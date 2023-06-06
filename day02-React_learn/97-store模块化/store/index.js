import {configureStore} from '@reduxjs/toolkit'
import goods from './slice/goodsSlice'
import car from './slice/carSlice'
const store = configureStore({//5.创建仓库
    reducer:{
        goods,
        car
    }
})
export default store;