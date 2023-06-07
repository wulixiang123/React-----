
import { Button, Space, Table } from 'antd';
import {DeleteOutlined,EditOutlined} from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table';
import { ITodoItem, ITodos } from '../api/todos/model/todosTypes';

export default function TableTest() {
    const columns:ColumnsType<ITodoItem> = [
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
            render(value:boolean,row:ITodoItem,index:number){
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
            render(row:ITodoItem){
                return(
                    <Space>
                        <Button type='primary' danger icon={<DeleteOutlined/>}></Button>
                        <Button type='primary' icon={<EditOutlined/>}></Button>
                    </Space>
                )
            }
        }
    ]

    const todos:ITodos = [
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
