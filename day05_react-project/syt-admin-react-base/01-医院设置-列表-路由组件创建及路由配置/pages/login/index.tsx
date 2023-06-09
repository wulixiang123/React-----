import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/app/hooks";
import { loginAsync, LoginParams } from "./slice";

import "./index.less";

function Login() {
  /*
    1. 收集表单数据
    2. 发送请求，请求登录
      服务器验证用户名密码是否正确
    3. 服务器返回登录信息，保存用户登录信息（为了实现用户免登陆）
      登录信息，代表用户的一个唯一标识：token

      客户端请求登录 
        - 服务器检查用户名和密码是否正确 
          - 对用户id进行JWT加密形成一个唯一标识：token
            - 服务器将token响应给客户端

      客户端下次发送请求需要携带token
        - 服务器通过token进行JWT解密就能得到用户id
          - 通过用户id就能查找到用户数据
            - 服务器返回相应的数据

      cookie
        服务器将token存储到cookie并返回客户端
        客户端会自动保存cookie，发送请求会自动携带cookie

      session
        将用户数据服务器内存中再存储一份，返回代表用户id的唯一标识token
        使用cookie保存token返回客户端
        客户端会自动保存cookie，发送请求会自动携带cookie

      headers
        服务器将token作为响应结果返回（响应体）
        客户端发送请求需要将token放在请求头中携带
        （服务器解析token，会去请求头中找token）
        1. 将token存储起来 
          将token数据存储在redux中（问题：刷新数据没了）
            所有存储在组件或redux中的数据都是内存存储，刷新就没了
            希望token持久化存储：--> WebStorage(localStorage/sessionStorage)浏览器本地持久化存储方案
              localStorage 永久存储
              sessionStorage 会话（临时）存储，刷新浏览器数据还在，一旦关闭浏览器数据就会自动删除

          总结：即储存在redux中，也储存在localStorage中
            localStorage，为了持久化
            redux，为了读写速度更快（性能更好）
          
        2. 发送请求时在headers携带token
          请求拦截器设置公共的请求参数：token

    4. 跳转到首页

    5. 获取用户数据
      登录成功请求用户数据展示
      刷新页面请求用户数据展示
        需要在一个统一公共的位置请求用户数据展示
          --> 
            Layout组件完成，所有组件都是Layout的子组件
            EmptyLayout, Login组件父组件
            --> 使用withAuthorization高阶组件来完成此功能
              --> 完成后在渲染Layout
  */
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: LoginParams) => {
    // 1. 收集表单数据
    // console.log(values);
    // 2. 发送请求，请求登录
    // 到底什么样的数据会交给redux管理？至少有两个组件以上使用这个数据
    // 将来用户相关的数据会有多个组件使用，交给redux管理
    const result = await dispatch(loginAsync(values)); // 3. redux中保存用户登录信息
    // 注意：不管登录成功/失败，promise状态都是成功的
    if (result.type === "user/loginAsync/fulfilled") {
      // 4. 跳转到首页(需要保证登录成功才能跳转)
      navigate("/syt/dashboard");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>尚医通平台管理系统</h1>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ username: "admin", password: "111111" }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: "请输入用户名!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入用户名密码!" }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" className="login-btn">
              登录
            </Button>
            <br />
            <br />
            <p>用户名:admin 密码:111111</p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
