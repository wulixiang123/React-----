import { Button, Card, Form, Image, Input, Select, Space, Table } from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import React,{useState,useEffect} from 'react'
import { ColumnsType } from 'antd/lib/table'
import { IDistrictList, IHospitalItem, IHospitalList } from '@/api/hospital/model/hospitalListType'
import { getDistrictList, getHospitalList } from '@/api/hospital/hospitalList'
const {Option} = Select

export default function HospitalList() {
  const [form] = Form.useForm()

  const onFinish = () => {
    console.log('aaaaa');
  }
  const columns:ColumnsType<IHospitalItem> = [
    {
      align:'center',
      title:'序号',
      render(value:any,row:any,index:number){
        return (index+1) + (page-1) * pageSize
      }
    },
    {
      title:'医院logo',
      render(row:IHospitalItem){
        return(
          <Image width={100} src={'data:image/jpg;base64,' + row.logoData}/>
        )
      }
    },
    {
      title:'医院名称',
      dataIndex:'hosname'
    },
    {
      title:'等级',
      dataIndex:'hostype'
    },
    {
      title:'详细地址',
      render(row:IHospitalItem){
        return row.param.fullAddress
      }
    },
    {
      title:'状态',
      render(row:IHospitalItem){
        return row.status ? '已上线':'未上线'
      }
    },
    {
      title:'创建时间',
      dataIndex:'createTime'
    },
    {
      title:'操作',
      render(row:IHospitalItem){
        return(
          <Space>
            <Button type='primary'>查看</Button>
            <Button type='primary'>排班</Button>
            <Button type='primary'>{row.status ? '下线':'上线'}</Button>
          </Space>
        )
      }
    },
  ]
  // 状态数据
  let [provinceList,setProvinceList] = useState<IDistrictList>([])
  let [cityList,setCityList] = useState<IDistrictList>([])
  let [areaList,setAreaList] = useState<IDistrictList>([])
  // 医院类型设置
  let [types,setTypes] = useState<IDistrictList>([])
  // 分页相关状态
  let [page,setPage] = useState<number>(1)
  let [pageSize,setPageSize] = useState<number>(3)
  let [total,setTotal] = useState<number>(10)
  let [hospitalList,setHospitalList] = useState<IHospitalList>([])

  const getProvince = async () => {
    let provinceList = await getDistrictList(86)
    console.log({provinceList});
    setProvinceList(provinceList)// 设置省状态
  }

  // 根据id获取市列表数据
  const getCities = async (id:string | number) => {
    let cityList = await getDistrictList(id);
    setCityList(cityList);
    // 重置市的表单的值
    // 重置区表单的值和 区状态数据为 []
    form.setFieldsValue({
      cityCode:undefined,
      districtCode:undefined
    })
    setAreaList([])
  }

  // 根据市id获取区列表数据
  const getArea = async (id:string | number) => {
    let areaList = await getDistrictList(id)
     console.log({areaList});
    setAreaList(areaList)
    form.setFieldsValue({
      districtCode:undefined
    })
  }

  const getTypes = async () => {
    let types = await getDistrictList(10000)
    console.log(types);
    setTypes(types)
    
  }

  // 获取医院列表分页数据
  const _getHospitalList = async () => {
    let {content,totalElements} = await getHospitalList({page,limit:pageSize})
    console.log({content});
    console.log({totalElements});
    setHospitalList(content)
    setTotal(totalElements)
  }

  useEffect(()=>{
    getProvince()
    getTypes()
  },[])

  useEffect(()=>{
    _getHospitalList()
  },[page,pageSize])

  return (
    <Card>
      <Form layout='inline' onFinish={onFinish} form={form}>
                <Form.Item>
                    <Select className='mb' style={{ width: 150 }} placeholder='请选择省' onChange={getCities}>
                        {provinceList.map(province=>(
                          <Option key={province.id} value={province.value}>{province.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name='cityCode'>
                    <Select style={{ width: 150 }} placeholder='请选择市' onChange={getArea}>
                        {cityList.map(city => (
                          <Option key={city.value}>{city.name}</Option>
                        ))}
                        
                    </Select>
                </Form.Item>
                <Form.Item name='districtCode'>
                    <Select style={{ width: 150 }} placeholder='请选择区'>
                        {areaList.map(area=>(
                          <Option key={area.id} value={area.value}>{area.name}</Option>
                        ))}
                        
                    </Select>
                </Form.Item>
                <Form.Item name='hosname'>
                    <Input placeholder='医院名称' />
                </Form.Item>
                <Form.Item name='hoscode'>
                    <Input placeholder='医院编号' />
                </Form.Item>
                <Form.Item name='hostype'>
                    <Select style={{ width: 150 }} placeholder='医院类型'>
                        {types.map(type=>(
                          <Option key={type.id} value={type.value}>{type.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name='status'>
                    <Select style={{ width: 150 }} placeholder='医院状态'>
                        <Option value={0}>未上线</Option>
                        <Option value={1}>已上线</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type='primary' icon={<SearchOutlined />} htmlType='submit'>查询</Button>
                        <Button disabled={true}>清空</Button>
                    </Space>
                </Form.Item>
            </Form>
            <Table 
              className='mt'
              rowKey={'id'}
              columns={columns}
              dataSource={hospitalList}
              pagination={{
                current:page,
                pageSize,
                total,
                onChange(page:number,pageSize:number){
                  setPage(page);
                  setPageSize(pageSize)
                }
              }}
              >
              </Table>

    </Card>
  )
}
