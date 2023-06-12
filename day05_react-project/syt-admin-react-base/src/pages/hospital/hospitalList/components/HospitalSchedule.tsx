import { getDepartmentList } from '@/api/hospital/hospitalList'
import { IDepartmentList } from '@/api/hospital/model/hospitalListTypes'
import { Button, Card, Col, Pagination, Row, Table, Tag, Tree } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { DataNode } from 'antd/lib/tree'
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'

export default function HospitalSchedule() {
    let {hoscode} = useParams()// 从path中获取hoscode

    const columns:ColumnsType<any> = [
        {
            title:'序号',
            render(value:any,row:any,index:number){
            return (index+1) + (page-1) * pageSize
            }
        },
        {
            title:'职称',
            dataIndex:''
        },
        {
            title:'号源时间'
        },
        {
            title:'总预约数'
        },
        {
            title:'剩余预约数'
        },
        {
            title:'挂号费(元)'
        },
        {
            title:'擅长技能'
        }
    ]

    const height = document.documentElement.clientHeight - 100 - 80// 根据可视区，动态计算科室列表高度
    // 定义状态
    let [departmentList,setDepartmentList] = useState<IDepartmentList>([])
    let [expandedKeys,setExpandedKeys] = useState<string[]>([])// 展开一级科室节点状态的数组
    let [depcode,setDepcode] = useState<string>()// 当前科室编号
    let [depname,setDepname] = useState<string>()// 当前科室名
    let [page,setPage] = useState<number>(1)
    let [pageSize,setPageSize] = useState<number>(3)

    // 获取科室列表并设置响应状态
    const _getDepartmentList = async () => {
        let departmentList = await getDepartmentList(hoscode as string)
        console.log({departmentList});
        // 将一级科室禁用，手段就是给一级科室的对象加上 disabled = true的属性和值
        departmentList = departmentList.map(item=>{
            item.disabled = true;
            return item
        })
        // 默认展开所有一级科室的子节点，就是让所有一级科室的depcode放到一个数组中，给expandedKeys属性赋值即可
        let expandedKeys = departmentList.map(item=>item.depcode)
        setExpandedKeys(expandedKeys)

        // 设置默认被选中的科室编号和科室名
        setDepcode((departmentList[0].children as IDepartmentList)[0].depcode);
        setDepname((departmentList[0].children as IDepartmentList)[0].depname);
        setDepartmentList(departmentList);
    }
    useEffect(()=>{
        hoscode && _getDepartmentList()
    },[])

    return (
        <Card>
            <div>选择： / {depname} / 2023-07-28</div>
            <Row className='mt' gutter={30}>
                <Col span={6}>
                    <div style={{ border: '1px solid #ddd', height,overflowY:'scroll'}}>
                        <Tree
                            // onSelect={onSelect}
                            // onCheck={onCheck}
                            treeData={departmentList as []}
                            // 自定义映射渲染字段
                            fieldNames={{
                                title:'depname',
                                key:'depcode'
                            }}
                            expandedKeys={expandedKeys}
                            selectedKeys={[depcode as string]}
                        />
                    </div>
                </Col>
                <Col span={18}>
                    <Tag>
                        <div>2023-07-28 周五</div>
                        <div>38 / 100</div>
                    </Tag>
                    <Tag>
                        <div>2023-07-28 周五</div>
                        <div>38 / 100</div>
                    </Tag>
                    <Tag>
                        <div>2023-07-28 周五</div>
                        <div>38 / 100</div>
                    </Tag>
                    <Tag>
                        <div>2023-07-28 周五</div>
                        <div>38 / 100</div>
                    </Tag>
                    <Tag>
                        <div>2023-07-28 周五</div>
                        <div>38 / 100</div>
                    </Tag>
                    <Pagination className='mt' showSizeChanger={true} pageSizeOptions={[5, 10, 20]} />

                    <Table
                        className="mt mb"
                        columns={columns}
                    />
                    <Button>返回</Button>
                </Col>
            </Row>

        </Card>
    )
}
