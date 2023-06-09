
import { Button, Space, Table } from 'antd';
import {DeleteOutlined,EditOutlined} from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table';
import { ITodoItem, ITodos } from '../api/users/model/todosTypes';
import { useState } from 'react';

export default function TableTest() {
    // 设置分页相关状态
    let [current,setCurrent] = useState<number>(1)//当前页
    let [pageSize,setPageSize] = useState<number>(2)//每页显示几条
    let [total,setTotal] = useState<number>(10)//总条数

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
        <Table 
        rowKey={'id'}
        dataSource={todos}
        columns={columns}
        /** 分页功能 pagination */
        // pagination={false}  不显示分页器
        pagination={{
            current,
            pageSize,
            total,
            showSizeChanger:true,
            pageSizeOptions:[5,10,20],
            showQuickJumper:true,
            showTotal(total:number){
                return(
                    <>
                        <span>总条数是:{total}</span>
                    </>
                )
            },
            onChange(page:number,pageSize:number){
                console.log('page:',page);
                console.log('pageSize:',pageSize);
                
                setCurrent(page)// 设置当前页
                setPageSize(pageSize)// 重新设置每页显示几条
            }
        }}
        />
    </div>
  )
}
