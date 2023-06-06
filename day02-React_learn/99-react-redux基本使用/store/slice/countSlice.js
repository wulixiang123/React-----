import {createSlice} from '@reduxjs/toolkit'
const countSlice = createSlice({
    name:'count',
    initialState:{
        num:1
    },
    reducers:{
        addNum(state,{payload}){
            state.num += payload
        }
    }
})
export default countSlice.reducer
export const {addNum} = countSlice.actions