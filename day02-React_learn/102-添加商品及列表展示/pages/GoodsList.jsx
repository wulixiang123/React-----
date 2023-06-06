import React from 'react'
import { useSelector } from 'react-redux'

export default function GoodsList() {
    let { goodsList } = useSelector(state => state.goods)
    return (
        <>
            <h3>商品列表</h3>
            <ul>
                {goodsList.map(goods => (
                    <li key={goods.id}>
                        <h3>商品名称: {goods.gname}</h3>
                        <p>价格: {goods.price}</p>
                        <p><button >加入购物车</button></p>
                    </li>
                ))}

            </ul>
        </>
    )
}
