import { Button, Card, Form, Input, Space, Table,Modal, message } from 'antd'
import React, {useEffect, useState} from 'react'
import {SearchOutlined,EditOutlined,DeleteOutlined,ExclamationCircleFilled} from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table'
import { deleteById, getHospitalSetList, removeBatch } from '@/api/hospital/hospitalSet'
import { IHospitalSetItem, IHospitalSetList } from '@/api/hospital/model/hospitalSetTypes'
import { useNavigate } from 'react-router-dom'

const {confirm} = Modal
export default function HospitalSet() {
  const navigate = useNavigate() 

  const [form] = Form.useForm()//// 1. 创建form对象
  const onFinish = () => {
     // 重新设置 hosname 和 hoscode的状态值即可
     // console.log(form.getFieldsValue());
     // 获取表单数据，注意 必须要有name属性 hosname  hoscode
    let {hosname,hoscode} = form.getFieldsValue();
    setHoscode(hoscode)// 设置状态
    setHosname(hosname)
    page !== 1 && setPage(1)// 重置页码为第一页
  }

  const clear = () => {// 清空操作
    form.resetFields()//重置显示
    setHoscode('')
    setHosname('')
    setPage(1)// 重置页码
  }

  const deleteHospital =  (id: string | number) => {
    confirm({
        title: '确定删除么?',
        icon: <ExclamationCircleFilled />,
        content: '删除医院设置',
        async onOk() {
            try {
                // 发送请求删除数据
                await deleteById(id);
                message.success('删除成功');
                // 刷新列表
                _getHospitalSetList();
            } catch (e) {
                message.error('删除失败');
            }
        }
    });
  }

  const columns:ColumnsType<any> = [
    {
      width:60,
      align:'center',
      title:'序号',
      render(value:any,row:any,index:number){
        return (index+1) + (page-1) * pageSize
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
      width:120,
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
      fixed:'right',
      width:100,
      title:'操作',
      render(row:IHospitalSetItem){
        return(
        <Space>
          <Button type='primary' icon={<EditOutlined />} onClick={()=>navigate('/syt/hospital/hospitalSet/edit/' + row.id)}></Button>
          <Button type='primary' icon={<DeleteOutlined />} danger onClick={()=>deleteHospital(row.id)}></Button>
        </Space>
        )
      }
        
    }
  ]

  // 定义相关状态数据
  let [page, setPage] = useState<number>(1); // 当前页
  let [pageSize, setPageSize] = useState<number>(3);// 每页几条
  let [total, setTotal] = useState<number>(10);// 总条数
  let [hospitalSetList, setHospitalSetList] = useState<IHospitalSetList>([]);//医院设置列表数据
  let [hosname, setHosname] = useState<string>();// 医院名称
  let [hoscode, setHoscode] = useState<string>();// 医院编号
  let [ids,setIds] = useState<React.Key[]>([])
  let [loading,setLoading] = useState<boolean>(false)

  const _getHospitalSetList = async () => {// 获取医院设置列表数据
    setLoading(true);
    let {records, total} = await getHospitalSetList({page,limit:pageSize,hoscode,hosname})
    // console.log(records);
    // console.log(total);
    setHospitalSetList(records)// 设置状态
    setTotal(total)
    setLoading(false)
  } 

  const _removeBatch = () => {
    confirm({
      title: '确定批量删除么?',
      icon: <ExclamationCircleFilled />,
      content: '批量删除医院设置',
      async onOk() {
              // 发送请求删除数据
              await removeBatch(ids);
              message.success('批量删除成功');
              // 刷新列表
              _getHospitalSetList();
              setIds([])
      }
  });
  }

  useEffect(()=>{// 组件加载完后执行
    _getHospitalSetList()
  },[page,pageSize,hosname,hoscode])

  return (
    <Card>
      <Form
        form={form}
        layout='inline'
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item
          name="hosname"
        >
          <Input placeholder='医院名称' />
        </Form.Item>

        <Form.Item
          name="hoscode"
        >
          <Input placeholder='医院编号' />
        </Form.Item>



        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              查询
            </Button>
            <Button onClick={clear} disabled={!hoscode && !hosname}>
              清空
            </Button>
          </Space>

        </Form.Item>
      </Form>

      <Space className='mt'>
        <Button type="primary" onClick={()=>navigate('/syt/hospital/hospitalSet/add')}>添加</Button>
        <Button disabled={!ids.length} onClick={_removeBatch}>批量删除</Button>
      </Space>

      <Table
      loading={loading}
      rowSelection={{
        onChange(selectedKeys:React.Key[]){
          console.log({selectedKeys});
          setIds(selectedKeys)
        }
      }}
      rowKey={'id'}
      className='mt'
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
      scroll={{
        x:1400
      }}
      />
    </Card>
  )
}
