import { Button, Card, Form, Input, Space, Table,Modal, message } from 'antd'
import React, {useEffect, useState} from 'react'
import {SearchOutlined,EditOutlined,DeleteOutlined,ExclamationCircleFilled} from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table'
import { deleteById, getHospitalSetList, removeBatch } from '@/api/hospital/hospitalSet'
import { IHospitalSetItem, IHospitalSetList } from '@/api/hospital/model/hospitalSetTypes'
import { useNavigate } from 'react-router-dom'

const {confirm} = Modal//Modal.confirm可以快捷地弹出确认框 这里我们解构,使用方便
export default function HospitalSet() {
  const navigate = useNavigate()//可以跳转到某个定义的路由页面

  const [form] = Form.useForm()// 1. 创建form对象 可以控制Form实例
  const onFinish = () => {
     // 重新设置 hosname 和 hoscode的状态值即可
     // console.log(form.getFieldsValue());
     // 获取表单数据，注意 必须要有name属性 hosname  hoscode
    let {hosname,hoscode} = form.getFieldsValue();//获取一组字段名对应的值，会按照对应结构返回。
    setHoscode(hoscode)// 设置hoscode状态
    setHosname(hosname)// 设置hosname状态
    page !== 1 && setPage(1)// 重置页码为第一页
  }

  const clear = () => {// 清空操作
    form.resetFields()//重置显示
    setHoscode(undefined)
    setHosname(undefined)
    setPage(1)// 重置页码
  }

  const deleteHospital =  (id: string | number) => {
    confirm({//弹框
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

  const columns:ColumnsType<any> = [//ColumnsType表格列的配置描述
    {
      width:60,
      align:'center',
      title:'序号',//
      render(value:any,row:any,index:number){
        return (index+1) + (page-1) * pageSize//序号排列
      }
    },
    {
      title:'医院名称',
      dataIndex:'hosname'//dataIndex列数据在数据项中对应的路径，支持通过数组查询嵌套路径
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
      render(row:IHospitalSetItem){//渲染其他组件或内容需要render return
        return(
        //间距
        <Space>
          <Button type='primary' icon={<EditOutlined />} onClick={()=>navigate('/syt/hospital/hospitalSet/edit/' + row.id)}></Button>
          <Button type='primary' icon={<DeleteOutlined />} danger onClick={()=>deleteHospital(row.id)}></Button>
          {/* danger设置危险按钮 primary按钮类型*/}
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
  let [loading,setLoading] = useState<boolean>(false)//加载效果 默认false,在下面调用改为true

  const _getHospitalSetList = async () => {// 获取医院设置列表数据
    setLoading(true);//加载
    let {records, total} = await getHospitalSetList({page,limit:pageSize,hoscode,hosname})
    // console.log(records);
    // console.log(total);
    setHospitalSetList(records)// 设置状态
    setTotal(total)//设置total总条数
    setLoading(false)//加载关闭
  } 

  const _removeBatch = () => {
    confirm({//对话框
      title: '确定批量删除么?',
      icon: <ExclamationCircleFilled />,
      content: '批量删除医院设置',
      async onOk() {
              // 发送请求删除数据
              await removeBatch(ids);
              message.success('批量删除成功');
              // 刷新列表
              _getHospitalSetList();//加载 - 设置状态 - 加载关闭
              setIds([])//id数据为空
      }
  });
  }

  useEffect(()=>{// 组件加载完后执行
    _getHospitalSetList()
  },[page,pageSize,hosname,hoscode])//监听对象

  return (
    <Card>
      {/* Card卡片 */}
      <Form
        form={form}//绑定
        layout='inline'//表单布局
        name="basic"//表单名称，会作为表单字段 id 前缀使用
        onFinish={onFinish}//获取表单数据
      >
        <Form.Item
        //表单字段组件，用于数据双向绑定、校验、布局等。
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
            {/* htmlType设置 button 原生的 type 值*/}
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
      loading={loading}//加载效果
      rowSelection={{//表格行是否可选择
        onChange(selectedKeys:React.Key[]){//onChange选中项发生变化时的回调
          console.log({selectedKeys});
          setIds(selectedKeys)
        }
      }}
      rowKey={'id'}//表格行 key 的取值，可以是字符串或一个函数
      className='mt'
      columns={columns}//渲染数据
      dataSource={hospitalSetList}//dataSource是需要渲染的数据数组
      pagination={{//分页器
        current:page,//当前页数
        pageSize,//每页条数
        total,//数据总数
        showQuickJumper:true,//是否可以快速跳转至某页
        showSizeChanger:true,//是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
        pageSizeOptions:[5,10,20],//指定每页可以显示多少条
        onChange(page:number,pageSize){//页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
          setPage(page);//点击之后改变页码
          setPageSize(pageSize)//点击之后改变每页条数
        }
      }}
      scroll={{//表格是否可滚动，也可以指定滚动区域的宽、高，配置项
        x:1400//横向滚动
      }}
      />
    </Card>
  )
}
