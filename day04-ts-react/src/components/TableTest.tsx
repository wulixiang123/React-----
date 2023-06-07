
import { Button, Space, Table } from 'antd';
import {DeleteOutlined,EditOutlined} from '@ant-design/icons'

export default function TableTest() {
    const columns = [
        {
            title:'序号',
            dataIndex:'id'
        },
        {
            title:'事项',
            dataIndex:'title'
        },
        {
            title:'是否已完成',
            dataIndex:'isDone',
            render(value:any,row:any,index:any){
                console.log('value:',value);
                console.log('row:',row);
                console.log('index:',index);
                return value ? '已完成':'未完成'
            }
            // render(isDone:any){
            //     return isDone ? '已完成' : '未完成'
            // }
        },
        {
            title:'操作',
            render(){
                return(
                    <Space>
                        <Button type='primary' danger icon={<DeleteOutlined/>}></Button>
                        <Button type='primary' icon={<EditOutlined/>}></Button>
                    </Space>
                )
            }
        }
    ]

    const todos = [
        {
            id:1,
            title:"吃饭",
            isDone:true
        },
        {
            id:2,
            title:"睡觉",
            isDone:true
        },
        {
            id:3,
            title:"打豆豆",
            isDone:false
        },
    ]

  return (
    <div>
        <Table rowKey={'id'} dataSource={todos} columns={columns}/>
    </div>
  )
}
