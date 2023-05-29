

## React Router 6 快速上手

## 1. 准备

### 1.1. 单页应用

- SPA (single page application): 单页应用
- 也就是整个应用只有一个页面, 页面切换时, 做局部页面更新 (可能要获取新的数据 )
- 好处: 加载数据少, 基本不会出现切换页面时空白的情况
- 现代的前端应用很多都是SPA

### 1.2. 路由



- 路由: 一个 key: value 的映射组合

- 后端路由:  path 与处理请求的回调及请求方式的映射组合

  ```js
  app.get('/getUser', (req, res) => {})
  ```

- 前台路由: path 与 路由组件的映射组合

  ```jsx
  <Route path='/about' element={<About/>}></Route>
  <Route path='/home' element={<Home/>}></Route>
  ```

   当请求某个路由路径时, 浏览器不会发请求, 而是在局部显示对应的路由组件

## 2. 概述

1. React Router 以三个不同的包发布到 npm 上，它们分别为：

   1. react-router: 路由的核心库，提供了很多的：组件、钩子。
   2. <strong style="color:#dd4d40">**react-router-dom:**</strong > 包含react-router所有内容，并添加一些专门用于 DOM 的组件，例如 <BrowserRouter>等 。
   3. react-router-native: 包括react-router所有内容，并添加一些专门用于ReactNative的API，例如:<NativeRouter>等。

2. 与React Router 5.x 版本相比，改变了什么？

   1. 内置组件的变化：移除`<Switch/>` ，新增 `<Routes/>`等。

   2. 语法的变化：`component={About}` 变为 `element={<About/>}`等。

   5. 新增多个hook：`useParams`、`useNavigate`、`useRoutes`等。

   7. <strong style="color:#dd4d40">官方明确推荐函数式组件了！！！</strong>

      ......

## 3. 内置组件

### 3.1. `<BrowserRouter>`

1. 说明：`<BrowserRouter> `用于包裹整个应用App。

2. 示例代码：

   ```jsx
   import React from "react";
   import ReactDOM from "react-dom";
   import { BrowserRouter } from "react-router-dom";
   
   ReactDOM.render(
     <BrowserRouter>
       {/* 整体结构（通常为App组件） */}
     </BrowserRouter>,root
   );
   ```

### 3.2. `<HashRouter>`

1. 说明：作用与`<BrowserRouter>`一样，但`<HashRouter>`的路由路径在地址中带`#`。
2. 备注：6.x版本中`<HashRouter>`、`<BrowserRouter> ` 的用法与 5.x 相同。

### 3.3. `<Routes/>与<Route/>`

1. v6版本中移出了先前的`<Switch>`，引入了新的替代者：`<Routes>`。

2. `<Routes>` 和 `<Route>`要配合使用，且必须要用`<Routes>`包裹`<Route>`。

3. `<Route>` 相当于一个 if 语句，如果其路径与当前 URL 匹配，则呈现其对应的组件。

4.  `<Route caseSensitive>` 属性用于指定：匹配时是否区分大小写（默认为 false）。

5. 当URL发生变化时，`<Routes> `都会查看其所有子` <Route>` 元素以找到最佳匹配并呈现组件 。

6.  `<Route>` 也可以嵌套使用，且可配合`useRoutes()`配置 “路由表” ，但需要通过 `<Outlet>` 组件来渲染其子路由。

7. 示例代码：

   ```jsx
   <Routes>
       {/* path属性用于定义路径，element属性用于定义当前路径所对应的组件 */}
       <Route path="/login" element={<Login />}></Route>
   
   		{/* 用于定义嵌套路由，home是一级路由，对应的路径/home */}
       <Route path="home" element={<Home />}>
          {/* test1 和 test2 是二级路由,对应的路径是/home/test1 或 /home/test2 */}
         <Route path="test1" element={<Test/>}></Route>
         <Route path="test2" element={<Test2/>}></Route>
   		</Route>
   </Routes>
   ```

### 3.4. `<Link>`

1. 作用: 修改URL，且不发送网络请求（路由链接）。

2. 注意: 外侧需要用`<BrowserRouter>`或`<HashRouter>`包裹。

3. 示例代码：

   ```jsx
   import { Link } from "react-router-dom";
   
   function Test() {
     return (
       <div>
       	<Link to="/路径">按钮</Link>
       </div>
     );
   }
   ```

### 3.5. `<NavLink>`

1. 作用: 与`<Link>`组件类似，且可实现导航的“高亮”效果。

2. 示例代码：

   ```jsx
   // 注意: NavLink默认类名是active，下面是指定自定义的class
   
   //自定义样式
   <NavLink
       to="login"
       className={({ isActive }) => {
           console.log('home', isActive)
           return isActive ? 'base atguigu' : 'base'
       }}
   >login</NavLink>
   ```

### 3.6. `<Navigate>`

1. 作用：只要`<Navigate>`组件被渲染，就会修改路径，切换视图。

2. `replace`属性用于控制跳转模式（push 或 replace，默认是push）。

3. 示例代码：

   ```jsx
   import React,{useState} from 'react'
   import {Navigate} from 'react-router-dom'
   
   export default function Home() {
   	const [sum,setSum] = useState(1)
   	return (
   		<div>
   			<h3>我是Home的内容</h3>
   			{/* 根据sum的值决定是否切换视图 */}
   			{sum === 1 ? <h4>sum的值为{sum}</h4> : <Navigate to="/about" replace={true}/>}
   			<button onClick={()=>setSum(2)}>点我将sum变为2</button>
   		</div>
   	)
   }
   ```

### 3.7. `<Outlet>`

1. 当`<Route>`产生嵌套时，渲染匹配的子路由。

2. 示例代码：

   ```jsx
   //根据路由表生成对应的路由规则
   const element = useRoutes([
     {
       path:'/about',
       element:<About/>
     },
     {
       path:'/home',
       element:<Home/>,
       children:[
         {
           path:'news',
           element:<News/>
         },
         {
           path:'message',
           element:<Message/>,
         }
       ]
     }
   ])
   
   //Home.js
   import React from 'react'
   import {NavLink,Outlet} from 'react-router-dom'
   
   export default function Home() {
   	return (
   		<div>
   			<h2>Home组件内容</h2>
   			<div>
   				<ul className="nav nav-tabs">
   					<li>
   						<NavLink className="list-group-item" to="news">News</NavLink>
   					</li>
   					<li>
   						<NavLink className="list-group-item" to="message">Message</NavLink>
   					</li>
   				</ul>
   				{/* 指定路由组件呈现的位置 */}
   				<Outlet />
   			</div>
   		</div>
   	)
   }
   ```

## 4. 内置 Hooks

### 4.1. useRoutes()

1. 作用：根据路由表，动态创建`<Routes>`和`<Route>`。

2. 示例代码：

   ```jsx
   //路由表配置：src/routes/index.js
   import About from '../pages/About'
   import Home from '../pages/Home'
   import {Navigate} from 'react-router-dom'
   
   export default [
   	{
   		path:'/about',
   		element:<About/>
   	},
   	{
   		path:'/home',
   		element:<Home/>
   	},
   	{
   		path:'/',
   		element:<Navigate to="/about"/>
   	}
   ]
   
   //App.jsx
   import React from 'react'
   import {NavLink,useRoutes} from 'react-router-dom'
   import routes from './routes'
   
   export default function App() {
   	//根据路由表生成对应的路由规则
   	const element = useRoutes(routes)
   	return (
   		<div>
   			......
         {/* 注册路由 */}
         {element}
   		  ......
   		</div>
   	)
   }
   
   ```

### 4.2. useNavigate()

1. 作用：返回一个函数用来实现编程式导航。

2. 示例代码：

   ```jsx
   import React from 'react'
   import {useNavigate} from 'react-router-dom'
   
   export default function Demo() {
     const navigate = useNavigate()
     const handle = () => {
       //第一种使用方式：指定具体的路径
       navigate('/login', {
         replace: false,
         state: {a:1, b:2}
       }) 
       
       // 前进
       // navigate(1)
       // 后退
       // navigate(-1)
     }
     
     return (
       <div>
         <button onClick={handle}>按钮</button>
       </div>
     )
   }
   ```

### 4.3. useParams()

1. 作用：返回当前匹配路由的`params`参数的对象，类似于5.x中的`match.params`。

2. 示例代码：

   ```jsx
   import { useParams } from "react-router-dom"
   
   export default function MessageDetail() {
     // 读取传递过来的param参数
     const {id, title, content} = useParams()
   
     return (
       <ul>
         <li>id: {id}</li>
         <li>title: {title}</li>
         <li>content: {content}</li>
       </ul>
     )
   }
   
   // 注册路由
   {
     path: 'detail/:id/:title/:content',  
     element: <MessageDetail/>
   }
   
   // 路由链接
   <Link to={`detail/${m.id}/${m.title}/${m.content}`}>{m.title}</Link>
   ```

### 4.4. useSearchParams()

1. 作用：用于读取和修改当前位置的 URL 中的查询字符串。

2. 返回一个包含两个值的数组，内容分别为：当前的seaech参数、更新search的函数。

3. 示例代码：

   ```jsx
   import {useSearchParams} from 'react-router-dom'
   
   export default function Detail() {
   	const [search,setSearch] = useSearchParams()
   	const id = search.get('id')
   	const title = search.get('title')
   	const content = search.get('content')
   	return (
   		<ul>
   			<li>
   				<button onClick={()=>setSearch('id=008&title=哈哈&content=嘻嘻')}>
             点我更新一下收到的search参数</button>
   			</li>
   			<li>消息编号：{id}</li>
   			<li>消息标题：{title}</li>
   			<li>消息内容：{content}</li>
   		</ul>
   	)
   }
   
   // 注册路由
   {
     path: 'detail',
     element: <MessageDetail/>
   }
   
   // 路由链接
   <Link to={`detail?id=${m.id}&title=${m.title}&content=${m.content}`}>{m.title}</Link>
   
   ```

### 4.5. useLocation()

1. 作用：获取当前 location 信息，对标5.x中的路由组件的`location`属性。

2. 示例代码：

   ```jsx
   import React from 'react'
   import {useLocation} from 'react-router-dom'
   
   export default function Detail() {
   	const x = useLocation()
   	console.log(x)
     // x就是location对象: 
   	/*
   		{
         hash: "",
         key: "ah9nv6sz",
         pathname: "/login",
         search: "?name=zs&age=18",
         state: {id: '001', title: 'm1', content: 'abcd'}
       }
   	*/
     const {state: {id, title, content}} = x
   	return (
   		<ul>
   			<li>消息编号：{id}</li>
   			<li>消息标题：{title}</li>
   			<li>消息内容：{content}</li>
   		</ul>
   	)
   }
   
   
   // 注册路由
   {
     path: 'detail',
     element: <MessageDetail/>
   }
   
   // 路由链接
   <Link to={`detail`} state={m}>{m.title}</Link>
   ```

## 5. 路由懒加载

> 问题: 
> 		所有路由组件代码是打包在一些的, 打开首页就会加载, 但我们开始只需要看到首页路由的效果, 
> 		也就是只需要执行首页路由组件代码
>
> 解决:
> 		对路由组件进行懒加载处理
>
> 深入理解
> 		对路由组件进行拆分/单独打包  => import函数动态引入
> 		访问路由时才去后台加载对应的打包文件  => lazy函数
> 		指定loading界面	=> <Suspense fallback={loading界面}>

> 文档: https://react.docschina.org/docs/react-api.html#reactlazy

```jsx
import {lazy, Suspense} from 'react'

// 懒加载动态引入组件
const About = lazy(() => import('../pages/About'))

// 路由表
{
  element: <Suspense fallback={<div>正在加载中...</div>}>
    <About />
  </Suspense>
}
```

