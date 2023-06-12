import { addHospitalSet, getHospitalSetById, updateHospitalSet } from '@/api/hospital/hospitalSet';
import { IAddHospitalSetParams } from '@/api/hospital/model/hospitalSetTypes'
import { Button, Card, Form, Input, message, Space } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function AddOrUpdate() {
    // 创建form对象
    const [form] = Form.useForm();// 1. 创建form对象 可以控制Form实例
    const navigate = useNavigate();//可以跳转到某个定义的路由页面
    let { id } = useParams();// 获取路由path参数id
    const onFinish = async (fields: IAddHospitalSetParams) => {
        // 1. 获取表单数据  useForm
        // 2. 发送请求
        // 3. 成功提示信息
        // 4. 跳转到医院设置列表页
        console.log('fields', fields);
        if (id) {// 编辑操作
            console.log('修改数据')
            fields.id = id;// 编辑数据，请求体数据中需要有id，但是表单提交过来的数据没有id，所以需要手动增加
            await updateHospitalSet(fields);
            message.success('修改成功');
        } else {// 新增操作
            await addHospitalSet(fields);
            message.success('添加成功');
        }
        navigate('/syt/hospital/hospitalSet')

    }
    // 获取编辑医院设置数据
    const _getHospitalSet = async () => {
        let hospitalSet = await getHospitalSetById(id as string);
        console.log(hospitalSet);
        form.setFieldsValue(hospitalSet);// 将医院原数据，渲染到表单
    }

    useEffect(() => {
        // 如果有id 说明是编辑操作，发送请求获取医院设置数据
        id && _getHospitalSet();
    }, [])
    return (
        <Card>
            <Form
                name="basic"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    label="医院名称"
                    name="hosname"
                    rules={[{ required: true, message: '请输入医院名称!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="医院编号"
                    name="hoscode"
                    rules={[{ required: true, message: '请输入医院编号!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="api基础路径"
                    name="apiUrl"
                    rules={[{ required: true, message: '请输入api基础路径!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="联系人姓名"
                    name="contactsName"
                    rules={[{ required: true, message: '请输入联系人姓名!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="联系人手机"
                    name="contactsPhone"
                    rules={[
                        { required: true, message: '联系人手机号必填!' },
                        { pattern: /^1[3-9]\d{9}$/, message: '手机号不合法'! }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                        <Button  >
                            返回
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    )
}
