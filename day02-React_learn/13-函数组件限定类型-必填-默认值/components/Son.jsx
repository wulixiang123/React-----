import React from 'react'
import PropTypes from 'prop-types' // 引入属性检查的包
//                           解构接收外部数据
export default function Son({ count, msg, getCount }) {
    return (
        <div>
            <h3>Son</h3>
            <p>count: {count}</p>
            <p>msg: {msg}</p>
            <p><button onClick={()=>getCount(101)}>sendCount</button></p>
        </div>
    )
}
Son.propTypes = {
    count: PropTypes.number.isRequired,
    msg:PropTypes.string
}

Son.defaultProps = {
    msg:'尚硅谷'
}
