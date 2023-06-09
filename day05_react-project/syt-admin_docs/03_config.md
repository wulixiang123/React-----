# 项目配置

## 1. 路径别名

### 概述

开发时当组件层级太深时，我们引入其他目录下文件需要回退很多层目录，很麻烦。

路径别名则提供另外一种写路径的方式，或者说路径简写，让我们可以从根路径出发直接写路径，简单方便。

### 配置

```json
// tsconfig.extend.json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@api/*": ["src/api/*"],
      "@assets/*": ["src/assets/*"],
      "@comps/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"],
      "@pages/*": ["src/pages/*"]
    }
  }
}
```

内部还做了两件事：

1. 实现功能：通过插件将上述配置加载到 `craco.config.js` , 最终会修改 `React` 脚手架配置，所以就可以项目中使用上述路径别名。

   ```js
   // 路径别名
   {
     plugin: CracoAlias,
     options: {
       source: "tsconfig",
       tsConfigPath: "./tsconfig.extend.json",
     },
   },
   ```

   

2. 路径提示：通过 extends 将上述配置加载到 `tsconfig.json` 中，此时在 `VSCode` 写代码才会有路径提示。

   ```json
   {
   	"extends": "./tsconfig.extend.json",
   }
   ```

   

我们将来如果要添加新的路径别名，只需要修改 `tsconfig.extend.json` 即可。

## 2. 代理服务器

### 概述

- 代理服务器可以解决开发时的跨域问题。
- React脚手架本身提供的配置方式只支持单个代理
- 如果开发中需要有多个如何处理?   ==> 利用craco工具来配置



### 配置

激活开发服务器代理功能，就要进行代理服务器配置

```js
// craco.config.js
module.exports = {
	
  ...
  ...
  
	// 开发服务器配置
	devServer: {
		// 激活代理服务器
		proxy: {
			// 将来以/dev-api开头的请求，就会被代理服务器转发到目标服务器去。
			"/dev-api": { // 需要转发的请求前缀
				target: "http://syt-api.atguigu.cn", // 目标服务器地址
				changeOrigin: true, // 为true时代理在转发时, 会将请求头的host改为target的值
				pathRewrite: { // 路径重写, 在转发请求时自动去除路径的/dev-api
					"^/dev-api": "",
				},
        	// 可以在下面配置多个代理
        	
			},
		},
	},
  
  
};
```

需要注意的是，一旦生产环境打包项目，服务器以及相关配置并不会打包进去，所以如果运行打包后的项目，还会产生跨域问题。

最终还是需要服务端来解决，将来我们会学习 `nginx` 来解决此问题。
