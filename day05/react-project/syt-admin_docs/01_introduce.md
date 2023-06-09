# 项目介绍



# 项目功能演示

## 下载依赖

**建议使用 yarn 下载依赖**

1. 安装 yarn

```
npm i yarn -g
```

2. 配置 yarn 的淘宝镜像

```
yarn config set registry https://registry.npmmirror.com/
```

3. 下载依赖, `在对应的项目目录下运行`

```
yarn
```

## 运行指令

运行项目的命令都在 package.json 中 scripts 里面

- 启动开发环境: 查看项目运行效果

```
yarn start 
```

- 启动生产环境：项目打包上线

```
yarn build 
```

## 查看效果

开发环境下会自动打开浏览器，我们直接查看效果





# 项目原型图

我们以写好项目为例，来查看项目功能&效果

详见：`syt-admin_final`



# 项目开发流程

1. 项目立项（管理层）
2. 项目需求分析（市场部）

​			`产出`：项目需求文档( 产品经理 )

3. 设计产品原型 (关键)  (axure)

​			`产出`：项目原型图/草图(产品经理)

4. 产品开会

​			产品经理召集`前端、后端、UI、测试`开会。

*   对于前端来说：

    - 产品经理会给我们介绍项目需求具体情况，我们需要尽可能搞清楚需求，同时需要敲定需求完成时间。

    - UI 提供项目`UI原型图/标注图`。

    - 后端提供`接口文档`。

    - 认识对接后端、UI、测试、产品同事。

5. 前端开发

   - 根据后端提供开发的接口文档`测试接口`

   - 按照需求文档要求`开发项目功能`


6. 测试
7. 上线



# 接口文档与测试

## 接口文档

- [医院管理接口文档](http://139.198.34.216:8201/swagger-ui.html)
- [用户登录接口文档](http://139.198.34.216:8230/doc.html)
- [数据字典接口文档](http://139.198.34.216:8202/swagger-ui.html)
- [用户管理接口文档](http://139.198.34.216:8203/swagger-ui.html)
- [订单管理接口文档](http://139.198.34.216:8206/swagger-ui.html)

## 测试接口

测试接口也叫对接口，联调接口。

我们可以使用 `swagger` `postman` 工具来测试接口。

测试接口目的：要保证接口是按照接口文档完成的，没有问题。这样未来我们开发时就不用考虑接口出错的原因了。



# 技术选型

- react@18 框架
- 全面使用hook函数组件
- react-router-dom@6 前端路由
- redux 集中状态管理方案
- axios 发送请求函数
- antd UI 库
- typescript
- nprogress 进度条
- create-react-app 脚手架
- craco 修改脚手架配置
- i18next & react-i18next i18n国际化
- echarts 数据可视化
- ...



# 项目代码

## 项目基础模板

详见`syt-admin_base`项目

## 项目目录文件介绍

```
├── public # 公共静态资源目录
│   ├── favicon.ico # 网站图标
│   ├── index.html # 主页面
├── src # 主目录
│   ├── api # 接口文件
│   ├── app # redux配置文件
│   ├── components # 公共组件
│   │   ├── Loading # loading组件
│   │   ├── Translation # 国际化组件
│   │   └── withAuthorization # 登陆权限校验组件
│   ├── layouts # 主要布局组件
│   ├── locales # i18n国际化配置
│   ├── pages # 路由组件
│   ├── routes # 路由配置
│   ├── styles # 全局/公共样式
│   ├── utils # 工具函数
│   │   └── http # 封装请求函数
│   ├── App.tsx # App组件
│   ├── index.ts # 主入口
│   ├── react-app-env.d.ts # 类型文件，在编译时会引入额外文件
├── .env.development # 开发环境加载的环境变量配置
├── .env.production # 生产环境加载的环境变量配置
├── .gitignore # git忽略文件
├── craco.config.js # react脚手架配置文件
├── package.json # 包文件
├── README.md # 项目说明文件
├── tsconfig.extend.json # 路径别名配置文件
├── tsconfig.json # ts配置文件
└── yarn.lock # yarn下载包的缓存文件
```



# 项目地址

- 完整项目: syt-admin_final
- 基础项目: syt-admin_base
- 项目文档: syt-admin_docs
- 前台尚医通挂号平台(前台)在线访问地址: 
  - http://syt-h5.atguigu.cn/
  - http://syt.atguigu.cn/



