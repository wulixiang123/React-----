import { FC } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Spin } from "antd";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getUserInfoAsync, selectUser } from "@/pages/login/slice";
/*
  高阶组件HOC
    本质上是一个函数，接受组件作为参数，返回一个新组件

  WrappedComponent 组件是哪个？
    看路由路径（地址）
      /login --> EmptyLayout/Login
      /syt/dashboard --> Layout/Dashboard
*/
function withAuthorization(WrappedComponent: FC) {
  return () => {
    /*
      当用户登陆过（token）
        访问首页，没问题
          判断是否有用户数据
            有，没问题
            没有数据，请求数据，在展示
        访问登录页面，请跳转到首页
      当用户没有登录过
        访问首页，跳转到登录页面重新登录
        访问登录页面，没问题
    */
    const { token, name } = useAppSelector(selectUser);

    // 获取当前路由地址
    const { pathname } = useLocation();

    if (token) {
      // 说明登录过
      if (pathname === "/login" || pathname === "/") {
        return <Navigate to="/syt/dashboard" />;
      }

      // 说明访问不能登录页面或/
      // 判断是否有用户数据
      if (name) {
        return <WrappedComponent />;
      }

      // 说明没有用户数据
      const dispatch = useAppDispatch();
      // 请求用户数据
      dispatch(getUserInfoAsync());

      return <Spin size="large" />;
    } else {
      // 说明没有登录过
      if (pathname === "/login") {
        return <WrappedComponent />;
      }

      // 说明访问不是登录页面
      return <Navigate to="/login" />;
    }
  };
}

export default withAuthorization;
