import { addHospitalSet } from "@/api/hospital/hospitalSet";
import { IAddHospitalSetParams } from "@/api/hospital/model/hospitalSetTypes";
import { Button, Form, Input, Space, message } from "antd";
import { log } from "console";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddOrUpdate() {
    const navigate = useNavigate() 
    const onFinish = (fields:IAddHospitalSetParams) => {
      console.log(fields);
      try{
      addHospitalSet(fields)
      message.success('添加成功')
      navigate('/syt/hospital/hospitalSet')
      }
      catch(e:any){
        message.error(e.message)
      }
    }
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 21 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="医院名称:"
          name="hosname"
          rules={[{ required: true, message: "请输入医院名称!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="医院编号:"
          name="hoscode"
          rules={[{ required: true, message: "请输入医院编号!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="api基础路径::"
          name="apiUrl"
          rules={[{ required: true, message: "请输入api基础路径!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="联系人姓名:"
          name="contactsName"
          rules={[{ required: true, message: "请输入联系人姓名!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="联系人手机:"
          name="contactsPhone"
          rules={[
            { required: true, message: "请输入合法联系人手机号!" },
            { pattern:/^1[3-9]\d{9}$/, message:'手机号不合法!'}
        ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 3, span: 21 }}>
            <Space>
            <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button>
            返回
          </Button>
            </Space>
        </Form.Item>
      </Form>
    </>
  );
}
