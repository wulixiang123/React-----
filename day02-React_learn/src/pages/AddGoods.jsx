import React from 'react'
import {useRef} from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addGoods } from '../store/slice/goodsSlice'
export default function AddGoods() {
  const dispatch = useDispatch()//redux框架对react原方法进行封装的方法useDispatch
  const navigate = useNavigate()//路由的方法配合navigate('/xxx网址')使用
  const gnameRef = useRef()//获取真实dom
  const priceRef = useRef()

  const submitHandler = (e)=>{
    e.preventDefault()
    let gname = gnameRef.current.value.trim()
    let price = +priceRef.current.value.trim()

    dispatch(addGoods({gname,price}))
    gnameRef.current.value=''
    priceRef.current.value=''
    navigate('/goodslist')
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        商品名称: <input type="text" name="" id="" ref={gnameRef}/>
        商品价格: <input type="text" name="" id="" ref={priceRef}/>  
        <button>添加商品</button>
      </form>  
    </>
  )
}
