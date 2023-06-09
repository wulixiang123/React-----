import { useEffect } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { reqAddHospital, reqGetHospitalById, reqUpdateHospital } from "@api/hospital/hospitalSet";
import { AddHospitalParams } from "@api/hospital/model/hospitalSetTypes";

export default function AddOrUpdateHospital() {
  // 医院数据
  // const [hospital, setHospital] = useState({
  //   hosname: "",
  //   hoscode: "",
  //   apiUrl: "",
  //   contactsPhone: "",
  //   contactsName: "",
  // });

  // 获取表单组件的实例对象
  // 通过表单组件的实例对象可以调用表单组件的方法
  // setFieldsValue 设置表单项的值
  const [form] = Form.useForm();

  // 获取路由参数
  const params = useParams();

  const id = +(params.id as string);

  // 获取医院数据
  const getHospitalById = async () => {
    const hospital = await reqGetHospitalById(id);
    // console.log(hospital);
    // setHospital(hospital);
    // 设置表单项的值
    form.setFieldsValue(hospital);
  };

  // 一上来就要请求 - useEffect
  useEffect(() => {
    // 添加医院不用发，修改医院才需要发
    if (!id) return;

    getHospitalById();
  }, []);

  /*
    将来发送请求需要携带参数：
      {
        "apiUrl": "string", // api基础路径
        "contactsName": "string", // 联系人姓名
        "contactsPhone": "string", // 联系人电话
        "hoscode": "string", // 医院编号
        "hosname": "string", // 医院名称
        // "id": 0, // id一定由服务器生成
      }
  */
  const navigate = useNavigate();

  const onFinish = async (values: AddHospitalParams) => {
    if (id) {
      // 修改医院
      /*
        values： { hosname: xx, ... }

        {
          hosname: xxx,
          ...,
          id: xxx
        }
      */
      await reqUpdateHospital({
        ...values, // 将values数据展开到新对象中
        id, // 添加id数据
      });
    } else {
      // 发送请求，添加医院
      await reqAddHospital(values);
    }

    message.success(`${id ? "修改" : "添加"}医院成功`);
    // 添加成功 - 跳转到医院设置页面
    goBack();
  };

  const goBack = () => {
    navigate("/syt/hospital/hospitalSet");
  };

  return (
    <Card>
      {/* 
        labelCol 左侧文字占的大小
        wrapperCol 右侧内容占的大小
        initialValues 初始化表单项的值
          只能第一次渲染时才能生效
          第二次在更新值就不能用了
      */}
      <Form labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} onFinish={onFinish} form={form}>
        {/* 
          label 左侧文字
          name 表单项名称
          rules 表单校验规则
            required: true 必填项（会显示红色的*）
            message: xxx 表单校验失败提示的错误信息

            表单校验规则文档：https://ant.design/components/form-cn/#Rule
        */}
        <Form.Item label="医院名称" name="hosname" rules={[{ required: true, message: "请输入医院名称!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="医院编号" name="hoscode" rules={[{ required: true, message: "请输入医院编号!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="api基础路径" name="apiUrl" rules={[{ required: true, message: "请输入api基础路径!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="联系人姓名" name="contactsName" rules={[{ required: true, message: "请输入联系人姓名!" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="联系人手机"
          name="contactsPhone"
          rules={[{ required: true, pattern: /^1[3-9][0-9]{9}$/, message: "请输入合法联系人手机号!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button className="ml" onClick={goBack}>
            返回
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
