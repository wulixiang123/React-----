# 搭建医院管理路由

每次开发新的功能模块，都需要先进行搭建路由。

所以接下来我们以搭建医院管理-医院设置/医院列表为例，来带大家搭建路由。

## 新建路由组件

我们只需要创建最简单的组件，不需要写具体细节。

我们需要创建两个路由组件：

- 医院设置
- src/pages/hospital/hospitalSet/index.tsx

```tsx
/* 
医院设置路由组件
*/
export default function HospitalSet() {
  return (
    <div>HospitalSet</div>
  )
}
```

- 医院列表
- src/pages/hospital/hospitalList/index.tsx

```tsx
/* 
医院列表路由组件
*/
export default function HospitalList() {
  return (
    <div>HospitalList</div>
  )
}
```

## 配置路由

- 在路由表中配置路由，方能通过地址访问我们的路由组件
- src/routes/index.ts

```tsx

...
...

// 引入路由组件
const HospitalSet = lazy(() => import("@pages/hospital/hospitalSet"));
const HospitalList = lazy(() => import("@pages/hospital/hospitalList"));

...
...

  {
    path: "/syt",
    element: <Layout />,
    children: [
      {
        path: "/syt/dashboard",
        meta: { icon: <HomeOutlined />, title: "首页" },
        element: load(Dashboard),
      },
      
      // 医院管理路由配置 start
      // 会自动根据配置来生成左侧菜单
      {
        // 路由访问路径
        path: "/syt/hospital",
        // 将来左侧菜单会根据meta内容生成
        meta: {
          // 菜单图标
          icon: <ShopOutlined />,
          // 菜单标题
          title: "医院管理",
        },
        // 子路由配置
        children: [
          {
            path: "/syt/hospital/hospitalSet",
            meta: { title: "医院设置" },
            // element代表要渲染的组件
            element: load(HospitalSet),
          },
          {
            path: "/syt/hospital/hospitalList",
            meta: { title: "医院列表" },
            element: load(HospitalList),
          },
        ],
      },
      // 医院管理路由配置 end
      
    ],
  },

  ...
	...

```

此时我们可以打开项目，通过点击左侧菜单，就访问我们定义的路由组件了~

