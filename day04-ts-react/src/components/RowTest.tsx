import React from 'react'
import {Row,Col} from 'antd'
export default function RowTest() {
    return (
        <div>
            <h3>栅格系统</h3>
            <Row>
                <Col span={12}>col-12</Col>
                <Col span={12}>col-12</Col>
            </Row>
        </div>
    )
}
