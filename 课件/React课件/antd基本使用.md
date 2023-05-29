

# 0. 创建typescript的 react项目

```shell
# npm 创建
create-react-app 项目名 --template typescript
# yarn 创建
yarn create react-app 项目名 --template typescript
```

# 1. 理解UI组件库

- 封装了一些通用的界面功能效果的组件，简化开发编码
- 流行的React UI组件库
  - 国内：`Ant Design` https://ant-design.gitee.io/index-cn
  - 国外：`Material UI` https://www.mdui.org/design

# 2. ant 基本使用

## 2-1. 下载

```shell
yarn add antd
yarn add @ant-design/icons # 后面下载一下，增加提示功能
```

## 2-2. 使用

- index.ts 

```js
import 'antd/dist/antd.css' # 引入antd的css样式
// import 'antd/dist/antd.min.css'

// 新版不需要引入css了
```

- App.tsx

```js
import {Button, Table} from 'antd' //引入需要用的antd组件
import {SearchOutlined} from '@ant-design/icons' // 引入图标组件

```

# 3. 自定义主题

> 问题：
>
> 有提示当前环境不支持less的警告错误
>
> antd默认的主体颜色是蓝色，而我们的应用是绿色
>
> 解决：
>
> 使用`craco`及其插件来解决

## 3-1. 下载工具包

```shell
yarn add @craco/craco
yarn add craco-less -D
# npm 安装如果报错， 加 --force强制安装
npm i @craco/craco -f
npm i craco-less -D -f  # --save-dev
```

## 3-2. 配置

- package.json

```js
"scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "test": "react-scripts test",
+   "start": "craco start",
+   "build": "craco build",
+   "test": "craco test",
}
```

- craco.config.js

```js
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
            /*
            * 覆盖内置的样式变量
            * https://ant-design.antgroup.com/docs/react/customize-theme-cn
            */
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

- index.tsx

```js
// import 'antd/dist/antd.css'
import 'antd/dist/antd.less'
```

- 重启脚手架

# 4. 配置路径别名

> 问题1：
>
> ​		在引入自定义模块时，可能要根据相对位置关系需要写多个 `../`,太麻烦
>
> 解决：
>
> ​		使用`模块路径 别名`来处理(webpack的技术)
>
> ​		需要使用`craco`的`craco-alias`插件来实现
>
> 问题2：
>
> ​		当使用了别名引入模块时，TS检查会报错
>
> 解决：
>
> ​		配置`tsconfig.json`
>
> `注意：一定要打开项目根目录`

## 4-1. 下载

```shell
yarn add craco-alias -D
```

## 4-2. 配置

- 项目根目录下创建：tsconfig.extend.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
		"paths": {
			"@/*": ["./src/*"],
			"@api/*": ["./src/api/*"],
			"@assets/*": ["./src/assets/*"],
			"@comps/*": ["./src/components/*"],
			"@utils/*": ["./src/utils/*"],
			"@pages/*": ["./src/pages/*"]
		}
  }
}
```

- 修改craco.config.js

```js
const CracoLessPlugin = require("craco-less");
const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    // 自定义主题
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
    // 路径别名
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./",
        tsConfigPath: "./tsconfig.extend.json",
      },
    },
  ],
  // 开发服务器配置
  devServer: {
    // 激活代理服务器
    proxy: {
      // 将来以/dev-api开头的请求，就会被开发服务器转发到目标服务器去。
      "/dev-api": {
        // 需要转发的请求前缀
        target: "http://syt-api.atguigu.cn", // 目标服务器地址
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          // 路径重写
          "^/dev-api": "",
        },
      },
    },
  },
};

```

- tsconfig.json

```js
{
    "extends":"./tsconfig.extend.json"
}
```



# 附录

## nrm使用

### 安装：

```shell
npm i nrm -g
```

### 常用命令

1. nrm test ： 查看各个镜像的速度
2. nrm use  tencent ： 将镜像设置为 腾讯镜像
3. nrm ls : 查看所有镜像地址，及当前使用的镜像[*]
