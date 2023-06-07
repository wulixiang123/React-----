import React from 'react'
import { Form, Input, Checkbox, Button } from 'antd'
export default function FormTest() {
    const onFinish = (values: any) => {
        // 点击submit按钮执行 values可以接收到表单数据【表单数据对象】
        console.log('Success:', values);
    };
    return (
        <div>
            <h3>Form</h3>
            <Form
                name="basic"
                /*文字宽度*/
                labelCol={{ span: 8 }} 
                /*表单元素宽度*/
                wrapperCol={{ span: 16 }}
                /** 自定义css样式 */
                style={{ maxWidth: 600 }}
                /**表单的初始值 */
                initialValues={{ remember: true,username:'atguigu',password:'123123' }}
                /**submit按钮提交之后执行的函数 */
                onFinish={onFinish}

            >
                <Form.Item
                    label="Username"
                    name="username"
                    /**表单校验规则 required 必填 message 不符合规则的提示信息 */
                    rules={[{ required: true, message: '请输入您的用户名!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: '请输入您的密码!' }]}
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
                </Form.Item>
            </Form>
        </div>
    )
}
