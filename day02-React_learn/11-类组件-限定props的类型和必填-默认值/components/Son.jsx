import React, { Component } from 'react'
// 1. 导入PropTypes包
import PropTypes from 'prop-types'

export default class Son extends Component {
    // 1. 定义一个静态的属性 propTypes 【名字是固定的】
    //    限定类型及是否必须传
    static propTypes = {
        // count 必填，并且只能是数组
        // count:PropTypes.number.isRequired
        count: PropTypes.number,
        msg: PropTypes.string.isRequired
    }
    // 2. 设置默认值
    static defaultProps = {
        count: 100
    }
    render() {
        let { count, msg } = this.props
        return (
            <div>
                <h3>Son</h3>
                <p>count: {count * 3}</p>
                <p>msg: {msg}</p>
            </div>
        )
    }
}
