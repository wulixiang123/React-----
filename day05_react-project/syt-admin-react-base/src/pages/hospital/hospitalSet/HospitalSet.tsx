import { Button, Card, Form, Input, Space, Table } from 'antd'
import {SearchOutlined,DeleteOutlined,EditOutlined} from '@ant-design/icons'

import React,{useEffect,useState} from 'react'
import { ColumnsType } from 'antd/lib/table'
import { getHospitalSetList } from '@/api/hospital/hospitalSet'
import { IHospitalSetItem, IHospitalSetList } from '@/api/hospital/model/hospitalSetTypes'

export default function HospitalSet() {
    
    const onFinish = () => {

    }
    const columns:ColumnsType<any> = [
        {
            title:'序号',
            render(value:any,row:any,index:number){
                return (page - 1) * pageSize + (index + 1)
            }
        },
        {
            title:'医院名称',
            dataIndex:'hosname'
        },
        {
            title:'医院编号',
            dataIndex:'hoscode'
        },
        {
            title:'api基础路径',
            dataIndex:'apiUrl'
        },
        {
            title:'签名',
            dataIndex:'signKey'
        },
        {
            title:'联系人姓名',
            dataIndex:'contactsName'
        },
        {
            title:'联系人手机',
            dataIndex:'contactsPhone'
        },
        {
            title:'操作',
            render(row:IHospitalSetItem){
                return (
                    <Space>
                        <Button type='primary' icon={<EditOutlined />}></Button>
                        <Button type='primary' icon={<DeleteOutlined />}danger></Button>
                    </Space>
                )
            }
        }
    ]
    // 设置相关状态数据
    let [page, setPage] = useState<number>(1); // 当前页
    let [pageSize, setPageSize] = useState<number>(3);// 每页几条
    let [total, setTotal] = useState<number>(10);// 总条数
    let [hospitalSetList, setHospitalSetList] = useState<IHospitalSetList>([]);//医院设置列表数据
    let [hosname, setHosname] = useState<string>();// 医院名称
    let [hoscode, setHoscode] = useState<string>();// 医院编号

    // 获取医院设置列表数据
    const _getHospitalSetList = async ()=>{
        let {records, total} = await getHospitalSetList({page,limit:pageSize,hoscode,hosname})
        // 设置状态
        setHospitalSetList(records);
        setTotal(total);
        // console.log('records: ', records);
        // console.log('total: ', total);
    }
    // 组件加载完后执行
    useEffect(()=>{
        _getHospitalSetList();
    },[page,pageSize])
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
                rowKey={'id'}
                className="mt"
                columns={columns}
                dataSource={hospitalSetList}
                pagination={{
                    current:page,
                    pageSize,
                    total,
                    showQuickJumper:true,
                    showSizeChanger:true,
                    pageSizeOptions:[5,10,20],
                    onChange(page:number,pageSize){
                        setPage(page);
                        setPageSize(pageSize)
                    }
                }}
            />
        </Card>
    )
}
