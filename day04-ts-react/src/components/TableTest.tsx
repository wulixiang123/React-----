
import { Button, Space, Table } from 'antd';
import {DeleteOutlined,EditOutlined} from '@ant-design/icons'
export default function TableTest() {
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
            // 没有配置 dataIndex的时候，value就是row
            // 配置了dataIndex value就是当前条记录 dataIndex 字段的值
            // 
            title:'是否已完成',
            dataIndex:'isDone',
            render(value:any,row:any,index:any){
                // console.log('value:',value);
                // console.log('row:',row);
                // console.log('index:',index);
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

  return (
    <div>               {//dataSource 指定表格渲染的数据源
                         //columns  列的列名，及渲染数据源里面的哪个字段
    }
        <Table rowKey={'id'} dataSource={todos} columns={columns}/>
    </div>
  )
}
