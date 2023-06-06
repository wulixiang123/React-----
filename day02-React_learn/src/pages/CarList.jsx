import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addBuyNum,asyncDecBuyNum} from '../store/slice/carSlice'
export default function CarList() {
  const dispatch = useDispatch()
  let {carList} = useSelector(state=>state.car) 
  return (
    <>
        <h3>购物车列表</h3>
        <ul>
          {carList.map(item=>(
            <li key={item.id}>
            <h3>商品名称:{item.gname}</h3>
            <p>价格:{item.price}</p>
            <p>数量<button onClick={()=>[
              dispatch(asyncDecBuyNum(item.id))
            ]}>-</button> {item.buyNum} <button onClick={()=>{
              dispatch(addBuyNum(item.id))
            }}> + </button></p>
        </li>
          ))}
        </ul>
    </>
  )
}
