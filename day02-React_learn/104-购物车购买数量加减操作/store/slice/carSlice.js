import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
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
                    buyNum:1//购买数量
                }]
            }else{//否则+1
                state.carList[index].buyNum += 1
            }
        },
        addBuyNum(state,{payload}){
            // 思路一：
            // state.carList = state.carList.map(item=>{
            //     if(item.id === payload){
            //         item.buyNum += 1
            //     }
            //     return item;
            // })
            // 思路二
            let index = state.carList.findIndex(item=>item.id === payload)
            state.carList[index].buyNum += 1
        }
    },
    extraReducers:builder=>
        builder
            .addCase(asyncDecBuyNum.fulfilled, (state, {payload})=>{
                state.carList.map(item=>{
                    if(item.id === payload){
                        item.buyNum -= 1;
                        if(item.buyNum <= 0){
                            alert('已清空')
                        }
                    }
                    return item;
                })
            })
})

export const { addCar,addBuyNum } = carSlice.actions

export const asyncDecBuyNum = createAsyncThunk('car/decBuyNum', (payload)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(payload)
        },2000)
    })
})
export default carSlice.reducer