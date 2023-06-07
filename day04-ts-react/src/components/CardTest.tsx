import React from 'react'
import { Card,Image,Tag,Button,message } from 'antd'
import ButtonTest from './ButtonTest'
export default function CardTest() {
    return (
        <div style={{ background: 'gray', padding: 30 }}>
            <Card>
                sadfas
                <Image
                    width={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
                <Tag color='green'>
                    2023/6/7
                    北京
                </Tag>
                <Tag color='magenta'>
                    2023/6/7
                    北京
                </Tag>
                <Tag>
                    2023/6/7
                    北京
                </Tag>
                <Button type='primary' onClick={()=>{
                    message.success('成功');
                    
                    //message.success绿色提示
                    // message.error红色提示
                    // message.warning黄色提示
                }}>成功</Button>
                <Button type='primary' danger onClick={()=>{
                    message.error('失败');
                }}>失败</Button>
                <Button type='primary' onClick={()=>{
                    message.warning('警告');
                }}>警告</Button>

                <Button type='primary' onClick={()=>{
                    
                }}>删除</Button>

            </Card>
        </div>
    )
}
