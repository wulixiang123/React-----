import React from 'react'
import {useSelector} from 'react-redux'
export default function CarList() {
  let {carList} = useSelector(state=>state.car) 
  return (
    <>
        <h3>购物车列表</h3>
        <ul>
          {carList.map(item=>(
            <li key={item.id}>
            <h3>商品名称:{item.gname}</h3>
            <p>价格:{item.price}</p>
            <p>数量<button>-</button> {item.buyNum} <button> + </button></p>
        </li>
          ))}
        </ul>
    </>
  )
}
