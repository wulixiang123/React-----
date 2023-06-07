import React from 'react'
import { Button,Space } from 'antd'
export default function SpaceTest() {
    return (
        <div>
            <h3>Space </h3>
            <Space size={30}>
                <Button type='primary'>保存</Button>
                <Button type='primary'>取消</Button>
                <Button type='primary'>取消</Button>
            </Space>
        </div>
    )
}
