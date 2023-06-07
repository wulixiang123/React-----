import React from 'react'
import { Form, Input, Checkbox, Button } from 'antd'
export default function Form2() {
    // 1. 创建一个form对象
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        // 3. 获取表单数据
        console.log(form.getFieldsValue());
    };
    /**
     * 清空表单数据的回调
     */
    const clear = ()=>{
        form.resetFields(); // 恢复到初始值的状态，如果没有初始值，就是直接清空
        //form.setFieldsValue({username:'',password:'',remember:false}) // 清空表单数据的方式二

        //form.setFieldsValue({username:'尚硅谷',password:'66',remember:true}) // 设置表单数据的值,为你指定的值
    }
    return (
        <div>
            <h3>Form</h3>
            {/* 2.绑定form对象到Form组件 */}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                // initialValues={{ remember: true, username: 'atguigu', password: '123123' }}
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button block type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button onClick={clear}>清空</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
