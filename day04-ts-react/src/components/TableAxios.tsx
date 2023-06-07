import React, { useEffect, useState } from 'react'
import { IUserItem, IUserList } from '../api/users/model/userTypes'
import Table, { ColumnsType } from 'antd/es/table'
import { Button, Image, Space } from 'antd'
import { getUsers } from '../api/users'

export default function TableAxios() {
    let [users,setUsers] = useState<IUserList>([])
    let [current,setCurrent] = useState<number>(1)
    let [pageSize,setPageSize] = useState<number>(3)
    let [total,setTotal] = useState<number>(10)
    const columns:ColumnsType<IUserItem> = [
        {
            title:'序号',
            render(value:any,row:any,index:number){
                return (index + 1) + (current - 1) * pageSize
            }
        },
        {
            title:'用户名',
            dataIndex:'login'
        },
        {
            title:'头像',
            render(row:IUserItem){
                return(
                    <Image src={row.avatar_url} width={150}/>
                )
            }
        },
        {
            title:'操作',
            render(row:IUserItem){
                return (
                    <Space>
                        <Button>删除</Button>
                        <Button>编辑</Button>
                    </Space>
                )
            }
        }
    ] 
    const asyncGetUsers = async () => {
        let res = await getUsers('aa')
        console.log(res);
        console.log(res.items);
        setUsers(res.items)
        setTotal(res.items.length)
    }
    useEffect(()=>{
        asyncGetUsers()
    },[])

  return (
    <div>
        <Table 
            rowKey={'id'}
            dataSource={users}
            columns={columns}
            pagination={{
                current,
                pageSize,
                total,
                showSizeChanger:true,
                pageSizeOptions:[5,10,15],
                onChange(page:number,pageSize:number){
                    setCurrent(page);
                    setPageSize(pageSize)
                }
            }}
        />
    </div>
  )
}
