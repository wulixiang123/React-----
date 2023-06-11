import { Button, Card, Form, Input, Select, Space, Table } from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import React,{useState,useEffect} from 'react'
import { ColumnsType } from 'antd/lib/table'
import { IDistrictList } from '@/api/hospital/model/hospitalListType'
import { getDistrictList } from '@/api/hospital/hospitalList'
const {Option} = Select

export default function HospitalList() {
  const [form] = Form.useForm()

  const onFinish = () => {
    console.log('aaaaa');
  }
  const columns:ColumnsType<any> = [
    {
      align:'center',
      title:'序号'
    },
    {
      title:'医院logo',
    },
    {
      title:'医院名称',
    },
    {
      title:'等级',
    },
    {
      title:'详细地址',
    },
    {
      title:'状态',
    },
    {
      title:'创建时间',
    },
    {
      title:'操作',
    },
  ]
  // 状态数据
  let [provinceList,setProvinceList] = useState<IDistrictList>([])
  let [cityList,setCityList] = useState<IDistrictList>([])
  let [areaList,setAreaList] = useState<IDistrictList>([])
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

  useEffect(()=>{
    getProvince()
  },[])

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
                        <Option>aaa</Option>
                        <Option>bbb</Option>
                        <Option>ccc</Option>
                    </Select>
                </Form.Item>
                <Form.Item name='status'>
                    <Select style={{ width: 150 }} placeholder='医院状态'>
                        <Option>aaa</Option>
                        <Option>bbb</Option>
                        <Option>ccc</Option>
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
              >
              </Table>

    </Card>
  )
}
