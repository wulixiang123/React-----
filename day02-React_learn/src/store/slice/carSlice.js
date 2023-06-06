import {createSlice} from '@reduxjs/toolkit'
const carSlice = createSlice({
    name:'car',
    initialState:{
        carList:[]
    },
    reducers:{
        addCar(state,{payload}){
            let index = state.carList.findIndex(item => item.id === payload.id)
            if(index === -1){
                state.carList = [...state.carList,{
                    ...payload,
                    buyNum:1//购买数量
                }]
            }else{
                state.carList[index].buyNum += 1
            }
        }
    }
})
export const {addCar} = carSlice.actions
// export default carSlice
export default carSlice.reducer