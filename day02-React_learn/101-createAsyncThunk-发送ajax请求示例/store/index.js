import { configureStore } from "@reduxjs/toolkit";
import count from './slice/countSlice'

const store = configureStore({
    reducer:{
        count
    }
})

export default store;