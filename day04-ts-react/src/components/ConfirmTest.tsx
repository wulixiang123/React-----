import React from 'react'
import { ExclamationCircleFilled, DeleteOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd'
const { confirm } = Modal
export default function ConfirmTest() {
    return (
        <div>
            <Button onClick={() => {
                confirm({
                    title: '删除',
                    icon: <ExclamationCircleFilled />,
                    content: '确定要删除么',
                    onOk() {
                        console.log('OK');
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                });
            }} type='primary' danger icon={<DeleteOutlined />}></Button>
        </div>
    )
}
