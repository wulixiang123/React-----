import React from 'react'
import { useParams } from 'react-router-dom'

export default function Detail() {
    // params参数获取，通过 useParams获取
    // let res = useParams();
    // console.log('res: ', res);// {id:1, school:'atguigu'}

    // 解构使用
    let {id, school} = useParams();
    return (
        <div>
            <h3>Detail</h3>
            <p>id: {id}</p>
            <p>school: {school}</p>
        </div>
    )
}
