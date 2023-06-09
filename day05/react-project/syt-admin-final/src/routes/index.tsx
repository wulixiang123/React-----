// src/routes/index.tsx
import { lazy, Suspense, FC } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { HomeOutlined, ShopOutlined, DatabaseOutlined, UserOutlined, UnorderedListOutlined, TableOutlined } from "@ant-design/icons";
import type { XRoutes } from "./types";

// import { Translation } from "react-i18next";
import Translation from "@comps/Translation";

import {
  Layout,
  EmptyLayout,
  // CompLayout
} from "../layouts";
import Loading from "@comps/Loading";

const Login = lazy(() => import("@pages/login"));
const Dashboard = lazy(() => import("@pages/dashboard"));
const NotFound = lazy(() => import("@pages/404"));

// 引入医院管理组件
const HospitalSet = lazy(() => import("@pages/hospital/hospitalSet"));
const AddOrUpdateHospital = lazy(() => import("@pages/hospital/hospitalSet/components/AddOrUpdateHospital"));
const HospitalList = lazy(() => import("@pages/hospital/hospitalList"));
const ShowHospital = lazy(() => import("@pages/hospital/hospitalList/components/ShowHospital"));
const HospitalSchedule = lazy(() => import("@pages/hospital/hospitalList/components/HospitalSchedule"));

const Dict = lazy(() => import("@pages/cmn/dict"));
const UserList = lazy(() => import("@pages/user/userList"));
const UserListShow = lazy(() => import("@pages/user/userList/components/UserListShow"));
const AuthList = lazy(() => import("@pages/user/authList"));
const OrderList = lazy(() => import("@pages/order/orderList"));
const OrderListShow = lazy(() => import("@pages/order/orderList/components/OrderListShow"));
const StatisticsOrder = lazy(() => import("@pages/statistics/order"));

const load = (Comp: FC) => {
  return (
    // 因为路由懒加载，组件需要一段网络请求时间才能加载并渲染
    // 在组件还未渲染时，fallback就生效，来渲染一个加载进度条效果
    // 当组件渲染完成时，fallback就失效了
    <Suspense fallback={<Loading />}>
      {/* 所有lazy的组件必须包裹Suspense组件，才能实现功能 */}
      <Comp />
    </Suspense>
  );
};

// 路由配置
const routes: XRoutes = [
  {
    path: "/",
    element: <EmptyLayout />,
    children: [
      {
        path: "login",
        element: load(Login),
      },
    ],
  },
  {
    path: "/syt",
    element: <Layout />,
    children: [
      {
        // 路由路径
        path: "/syt/dashboard",
        // 自动生成左侧菜单（不是前端路由提供的，项目内部实现的）
        meta: {
          // 左侧菜单图标
          icon: <HomeOutlined />,
          // 左侧菜单的标题
          // title: "首页",
          // ns是namespaced简写，命名空间。使用语言包中哪个文件
          // render props 组件的高级用法
          // <ChildComp>{(content) => <span>{content}</span>}</ChildComp>
          // title: <Translation ns="route">{(t) => t("dashboard")}</Translation>,
          // title: <Translation ns="route">dashboard</Translation>,
          title: <Translation>route:dashboard</Translation>,
        },
        // 路由组件
        element: load(Dashboard),
      },
      {
        path: "/syt/hospital",
        meta: {
          icon: <ShopOutlined />,
          title: <Translation>route:hospital</Translation>,
        },
        // 医院管理本身不需要渲染任何组件
        // element: xxx
        // 渲染的子路由
        children: [
          {
            path: "/syt/hospital/hospitalSet",
            meta: {
              title: <Translation>route:hospitalSet</Translation>,
            },
            element: load(HospitalSet),
          },
          {
            path: "/syt/hospital/hospitalSet/add",
            element: load(AddOrUpdateHospital),
            meta: {
              title: "添加医院",
            },
            // 不会显示左侧菜单
            hidden: true,
          },
          {
            path: "/syt/hospital/hospitalSet/edit/:id",
            element: load(AddOrUpdateHospital),
            meta: {
              title: "修改医院",
            },
            // 不会显示左侧菜单
            hidden: true,
          },
          {
            path: "/syt/hospital/hospitalList",
            meta: {
              title: <Translation>route:hospitalList</Translation>,
            },
            element: load(HospitalList),
          },
          {
            path: "/syt/hospital/hospitalList/show/:id",
            element: load(ShowHospital),
            meta: {
              title: "显示医院详情",
            },
            // 不会显示左侧菜单
            hidden: true,
          },
          {
            path: "/syt/hospital/hospitalList/schedule/:hoscode",
            element: load(HospitalSchedule),
            meta: {
              title: "医院排班",
            },
            // 不会显示左侧菜单
            hidden: true,
          },
        ],
      },
      {
        path: "/syt/cmn",
        meta: {
          icon: <DatabaseOutlined />,
          title: <Translation>route:data</Translation>,
        },
        children: [
          {
            path: "/syt/cmn/dict",
            meta: {
              title: <Translation>route:dict</Translation>,
            },
            element: load(Dict),
          },
        ],
      },
      {
        path: "/syt/user",
        meta: { icon: <UserOutlined />, title: <Translation>route:member</Translation> },
        children: [
          {
            path: "/syt/user/userInfo",
            element: load(UserList),
            meta: { title: <Translation>route:memberList</Translation> },
          },
          {
            path: "/syt/user/userInfo/show/:id",
            element: load(UserListShow),
            meta: { title: "会员列表" },
            hidden: true,
          },
          {
            path: "/syt/user/userInfo/authList",
            element: load(AuthList),
            meta: { title: <Translation>route:certificationList</Translation> },
          },
        ],
      },
      {
        path: "/syt/order",
        meta: { icon: <UnorderedListOutlined />, title: <Translation>route:order</Translation> },
        children: [
          {
            path: "/syt/order/orderInfo",
            meta: { title: <Translation>route:orderList</Translation> },
            element: load(OrderList),
          },
          {
            path: "/syt/order/orderInfo/show/:id",
            element: load(OrderListShow),
            meta: { title: "订单列表" },
            hidden: true,
          },
        ],
      },
      {
        path: "/syt/statistics",
        meta: { icon: <TableOutlined />, title: <Translation>route:statistics</Translation> },
        children: [
          {
            path: "/syt/statistics/order",
            meta: { title: <Translation>route:statisticsList</Translation> },
            element: load(StatisticsOrder),
          },
        ],
      },
    ],
  },

  {
    path: "/404",
    element: load(NotFound),
  },

  {
    path: "*", // 任意路径：除了上面路径以外其他路径
    element: <Navigate to="/404" />,
  },
];

/* 
自定义hook: 注册应用的所有路由
*/
export const useAppRoutes = () => {
  return useRoutes(routes);
};

// 找到要渲染成左侧菜单的路由
export const findSideBarRoutes = () => {
  const currentIndex = routes.findIndex((route) => route.path === "/syt");
  return routes[currentIndex].children as XRoutes;
};

export default routes;
