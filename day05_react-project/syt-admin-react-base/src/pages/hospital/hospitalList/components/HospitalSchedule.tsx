import { getDepartmentList, getDoctorList, getScheduleList } from '@/api/hospital/hospitalList'
import { IDepartmentList, IDoctorList, IScheduleList } from '@/api/hospital/model/hospitalListTypes'
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
            dataIndex:'title'
        },
        {
            title:'号源时间',
            dataIndex:'workDate'
        },
        {
            title:'总预约数',
            dataIndex:'reservedNumber'
        },
        {
            title:'剩余预约数',
            dataIndex:'availableNumber'
        },
        {
            title:'挂号费(元)',
            dataIndex:'amount'
        },
        {
            title:'擅长技能',
            dataIndex:'skill'
        }
    ]

    const height = document.documentElement.clientHeight - 100 - 80// 根据可视区，动态计算科室列表高度
    // 定义状态
    let [departmentList,setDepartmentList] = useState<IDepartmentList>([])
    let [expandedKeys,setExpandedKeys] = useState<string[]>([])// 展开一级科室节点状态的数组
    let [depcode,setDepcode] = useState<string>()// 当前科室编号
    let [depname,setDepname] = useState<string>()// 当前科室名
    // 分页相关状态
    let [page,setPage] = useState<number>(1)
    let [pageSize,setPageSize] = useState<number>(5)
    let [total,setTotal] = useState<number>(10)
    // 排班日期相关状态
    let [bookingScheduleList,setBookingScheduleList] = useState<IScheduleList>()
    let [hosname,setHosname] = useState<string>()
    let [workDate,setWorkDate] = useState<string>()
    // 医生列表状态
    let [doctorList,setDoctorList] = useState<IDoctorList>([])
    let [loading,setLoading] = useState<boolean>(false)

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

    // 获取排班日期分页数据
    const _getScheduleList = async () => {
        let {bookingScheduleList,total,baseMap:{hosname}} = await getScheduleList(page, pageSize, hoscode as string, depcode as string);
        // 设置状态数据
        setTotal(total)
        setHosname(hosname)
        setBookingScheduleList(bookingScheduleList)
        // 设置排班日期第一项的日期为默认的日期状态
        setWorkDate(bookingScheduleList[0].workDate);
    }

    // 获取排班医生列表
    const _getDoctorList = async ()=>{
        let doctorList = await getDoctorList(hoscode as string, depcode as string, workDate as string);
        setDoctorList(doctorList);
        // console.log(doctorList);
    }

    useEffect(()=>{
        hoscode && _getDepartmentList()// 监听depcode，当科室变化的时候，重新获取该科室下的排班日期
    },[])

    useEffect(()=>{
        depcode && _getScheduleList()
    },[depcode,page,pageSize])

    useEffect(()=>{
        workDate && _getDoctorList()
    },[workDate])

    return (
        <Card>
            <div>选择：{hosname} / {depname} / {workDate}</div>
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
                            // 节点选中触发
                            onSelect={(selectKeys:any,info:any)=>{
                                console.log({selectKeys});
                                console.log({info});
                                setDepcode(info.node.depcode)
                                setDepname(info.node.depname)
                                
                                
                            }}
                        />
                    </div>
                </Col>
                <Col span={18}>
                    {bookingScheduleList?.map(item => (
                        <Tag key={item.workDate} color={workDate===item.workDate ? 'green' : ''} onClick={()=>{
                            setWorkDate(item.workDate);// 点击tag，设置workDate
                        }}>
                            <div>{item.workDate} {item.dayOfWeek}</div>
                            <div>{item.availableNumber} / {item.reservedNumber}</div>
                        </Tag>
                    ))}
                    <Pagination 
                        className='mt'
                        showSizeChanger={true} 
                        pageSizeOptions={[5, 10, 20]}
                        current={page}
                        pageSize={pageSize}
                        total={total}
                        onChange={(page:number,pageSize:number)=>{
                            setPage(page)
                            setPageSize(pageSize)
                        }}
                    />

                    {(bookingScheduleList as IScheduleList)?.length !== 0 && <Table
                        className="mt"
                        columns={columns}
                        dataSource={doctorList}
                        rowKey={'id'}
                        pagination={false}
                    />}
                    <Button className='mt'>返回</Button>
                </Col>
            </Row>

        </Card>
    )
}
