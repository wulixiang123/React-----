import React from 'react'
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addGoods } from '../store/slice/goodsSlice';

export default function AddGoods() {
    /**
     * 将商品添加到 store 的 goodsSlice切片的 goodsList数组中
     */
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const gnameRef = useRef();
    const priceRef = useRef();

    const submitHandler = (e)=>{
        e.preventDefault();// 阻止默认行为
        // 获取商品名和价格
        let gname = gnameRef.current.value.trim();
        let price = +priceRef.current.value.trim();
        // 调用addGoods的actionCreator
        dispatch(addGoods({gname,price}))
        // 清空表单
        gnameRef.current.value = '';
        priceRef.current.value = '';
        // 跳转到商品列表页
        navigate('/goodslist')
    }
    return (
        <>
            <form onSubmit={submitHandler}>
                商品名称: <input type="text" ref={gnameRef} name="" id="" /><br />
                商品价格: <input type="text" ref={priceRef} name="" id="" /><br />
                <button>添加商品</button>
            </form>
        </>
    )
}
