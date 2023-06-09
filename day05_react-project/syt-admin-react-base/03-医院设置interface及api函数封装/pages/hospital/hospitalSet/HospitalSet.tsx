import { Button, Card, Form, Input, Space, Table } from 'antd'
import {SearchOutlined} from '@ant-design/icons'

import React from 'react'
import { ColumnsType } from 'antd/lib/table'

export default function HospitalSet() {
    const onFinish = () => {

    }
    const columns:ColumnsType<any> = [
        {
            title:'序号'
        },
        {
            title:'医院名称'
        },
        {
            title:'医院编号'
        },
        {
            title:'api基础路径'
        },
        {
            title:'签名'
        },
        {
            title:'联系人姓名'
        },
        {
            title:'联系人手机'
        },
        {
            title:'操作'
        }
    ]
    return (
        <Card>
            {/* 1. from  */}
            <Form
                layout='inline'
                name="basic"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                >
                    <Input placeholder='医院名称'/>
                </Form.Item>

                <Form.Item
                    name="password"
                >
                    <Input  placeholder='医院编号'/>
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                            查询
                        </Button>
                        <Button  >
                            清空
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
            {/* 2. buttons */}
            <Space className="mt">
                <Button type="primary">添加</Button>
                <Button disabled>批量删除</Button>
            </Space>
            {/* 3. table表格 */}

            <Table
                className="mt"
                columns={columns}
            />
        </Card>
    )
}
