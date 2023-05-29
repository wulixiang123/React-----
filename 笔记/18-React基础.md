#		React基础

###		1.如何快速创建react基础的代码

> - 代码片段配置：vscode->文件->首选项->配置用户代码片段->新建代码片段->输入代码片段名->复制粘贴如下内容
>
> - 代码片段文件删除：查看->外观->痕迹导航【看文件所在目录(需打开隐藏文件夹显示选项)】->根据路径找到文件删除

```json
{

	"react模板":{
		"prefix": "!react",
		"body": [
			"<!DOCTYPE html>",
			"<html lang=\"en\">",
			"<head>",
				"\t<meta charset=\"UTF-8\">",
				"\t<title>Title</title>",
				"\t<script src=\"./lib/react.development.js\"></script>",
				"\t<script src=\"./lib/react-dom.development.js\"></script>",
				"\t<script src=\"./lib/babel.min.js\"></script>",
			"</head>",
			"<body>",
			"\t<div id=\"root\"></div>",
			"</body>",
			"<script type=\"text/babel\">",
			"\tconst root = ReactDOM.createRoot(document.querySelector(\"#root\"));",
			"\troot.render((",
				"\t\t<div></div>",
			"\t))",
			"</script>",
			"</html>"
		],
		"description": "快速构建react模板页页面"
	},
    "react模板2":{
		"prefix": "!react2",
		"body": [
			"<!DOCTYPE html>",
			"<html lang=\"en\">",
			"<head>",
				"\t<meta charset=\"UTF-8\">",
				"\t<title>Title</title>",
				"\t<script src=\"./lib/react.development.js\"></script>",
				"\t<script src=\"./lib/react-dom.development.js\"></script>",
			"</head>",
			"<body>",
			"\t<div id=\"root\"></div>",
			"</body>",
			"<script>",
			"\tconst root = ReactDOM.createRoot(document.querySelector(\"#root\"));",
			"\troot.render((",
				"\t\t<div></div>",
			"\t))",
			"</script>",
			"</html>"
		],
		"description": "快速构建react模板页页面"
	}
}
```

配置好之后的代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!-- 提供了React库的核心对象 React -->
    <script src="./lib/react.development.js"></script>
    <!-- 
        提供了ReactDOM对象，用来操作DOM的
        DOM三个单词都是大写的
    -->
    <script src="./lib/react-dom.development.js"></script>
    <script src="./lib/babel.min.js"></script>
</head>
<body>
    <!-- react对象要操作dom的根节点 -->
    <div id="root"></div>
</body>
<script type="text/babel">
    console.log(React);
    console.log(ReactDOM);
    /**
     * create 创建
     * Root 根
     */
    const root = ReactDOM.createRoot(document.getElementById('root'));
    // 表演
    root.render('我是夏洛');
</script>
</html>
```

###		2.注意事项

> 在React中,只能有一个'舞台',也就是body里创建的一个元素如div
>
> 结论：一个页面 一个容器对应一个唯一的root [推荐]

怎么使用React选中咱们的元素并控制舞台的渲染呢?

```js
 let root = ReactDOM.createRoot(document.querySelector("#root"));
```

怎么使用React去渲染页面呢?

```js
root.reader('我是渲染页面')
```

###		3.虚拟Dom和真实Dom的区别

> 1. 服务器响应html文件给前端，浏览器解析器就会生成一个Dom树
>
> 2. 服务器响应css 文件  给前端，浏览器css解析器会生成 css的渲染树
>
> 3. 服务器响应js    文件 给前端，浏览器js解析器会解析js代码。
>
> 4. 当js改变元素标签的几何属性时,就会导致重排和重绘
>
> 5. 几何属性就是宽,高,边框,位置等
>
> 6. 当几何属性改变时,必然影响其他元素,就会导致重排重绘,如果改变的是元素的背景颜色等不会重排
>
>    也就是说重排必然重绘,重绘不一定重排
>
>    如果去操作真实的dom,就必然导致大量的重排和重绘
>
>7. 虚拟dom,本质上是就是一个对象,该对象属性很少,只有渲染所需的属性,虚拟dom也可以转化成真实dom

####		3-1.创建真实dom

```js
const oDiv = document.getElementById('root');
        console.dir(oDiv);

        const newDiv = document.createElement('div');// 真实dom
        newDiv.innerHTML = 'newDiv'
        console.dir(newDiv);
        document.body.appendChild(newDiv);// 真实dom渲染到页面
```

####		3-2.创建虚拟dom

```js
//创建react元素
//语法：React.createElement(标签名,属性对象,子元素,子元素,....)
//jsx创建(推荐)
const myDiv = React.createElement('div',{id:'box',school:'尚硅谷'},1111,2222,3333);
console.log(oDiv); // 虚拟dom ==> react元素   type标签名 props：属性 props.children子元素
root.render(oDiv)
```

未来提到react元素就表示我们要创建虚拟dom了!!!

创建虚拟dom,如果传参的位置不同,那么就需要以下方法

```js
<script type="text/babel">
    const root = ReactDOM.createRoot(document.querySelector("#root"));
    // 1. 没有标签属性.需要占位： {}、null、undefined
    // let oDiv = React.createElement('div',{},123);//需要一个空对象或者null等进行占位
    // let oDiv = React.createElement('div',null,123);
    // let oDiv = React.createElement('div',undefined,123);
    // let oDiv = React.createElement('div',[12345],123);// 也行，但是不推荐
    // root.render(oDiv)
<script/>
```

特殊属性class

```js
let oSpan = React.createElement('span',{id:'box',class:'wrapper'},'我是span')//不能使用class
    //Invalid DOM property `class`. Did you mean `className`?
    //不合法的 DOM   属性     class   你的意思是calssName?

    // let oSpan = React.createElement('span', {id:'box', className:'wrapper'}, '我是span')
    console.dir(document.querySelector('p')); // 真实dom class属性用的就是 className
    root.render(oSpan);
```

###		4.jsx

> 1. 什么是jsx?
>    - 是react的特殊语法
>    - 作用：用来创建 react元素的。
>    - 语法特点：结合了js + xml 的语法特点
> 2. 注意事项
>    1. jsx 使用来创建react元素[虚拟dom] ，最终会转化为正式dom并渲染到页面
>       所以：
>    2. jsx 可以写的标签名有两种类型
>       1. 标签名全小写：html的标签，最终会解析为真实的html标签
>       2. 标签名首字母大写：会当做 React组件 进行处理

####	4-1.jsx基本使用

之前的方式

```js
const myDiv = React.createElement('div',null,123)
```

现在

```js
const myDiv = <div>123</div>
```

jsx也可以用()进行换行和代码格式化

```js
const myBox = (  // jsx使用 () 可以进行换行和代码格式化
    <div>
        <h1>我是h1</h1>
        <p>
            <span>我是span</span>
        </p>
    </div>
)
//渲染到页面
root.render(myBox);
```

####	4-2.注意事项

> ​	jsx用来创建虚拟dom 虚拟dom会转化为真实的dom,所以:
>
> 1.jsx必须写html所具有的标签如p,div,span等
>
> 2.jsx可以首字母大写,首字母大写了会被当作React组件进行处理

```js
const root = ReactDOM.createRoot(document.querySelector("#root"));
// const oDiv = (
//     <user>
//         <name>atguigu</name>
//     </user>
// )
// root.render(oDiv) // 可以渲染，但是有警告：标签名浏览器不认识

const oBox = ( // 将User当做组件来处理的，因为没有定义该组件，所以报错了
    <User></User>
)
root.render(oBox)//渲染到页面
```

####	4-3插值表达式

最好用的方法来了!!!

```js
const root = ReactDOM.createRoot(document.querySelector("#root"));
let num = 90; // 变量 num 数字
function fn(){
    console.log('fn');
}
function fn2(){
    return 100;
}
root.render((
    <div>
        <h3>基本数据类型</h3>
        <p>字符串: {'123'}</p>
        <p>数字: {num}</p>
        <h3>布尔值</h3>
        <p>true： {true}</p>
        <p>false {false}</p>
        <h3>null</h3>
        <p>null:{null}</p>
        <h3>undefined</h3>
        <p>undefined:{undefined}</p>

        <h3>引用数据类型【只能填数组，其他都报错或警告】</h3>
        {/*<p>对象: {{name:'atguigu',age:19}}</p>   对象直接报错*/}

        {//
        }
        <h3>数组：</h3>
        <p>数组1：{[1, 2, 3, 4]}</p>
        {/*
            报错：因为挨个遍历渲染时，发现是对象，报错
            <p>数组2：{[{id:1,title:'吃饭', isDone:false},{id:2,title:'睡觉', isDone:false}]}</p>
        */}
        {/* 函数也会警告
         <p>函数: {function fn(){console.log(123)}}</p>
        */}
        <h3>逻辑表达式</h3>
        <p>{5 && 8}</p>
        <p>{0 || 1}</p>

        <h3>三元表达式</h3>
        <p>{1 == '1' ? '真' : '假'}</p>

        <h3>函数调用</h3>
        <p>{fn()}</p>
        <p>{fn2()}</p>
    </div>
))
```

> ​	在root.render中把需要渲染的值写在{}中,但需要注意 基本数据类型都可以写 但引用数据类型只能填数组,填函数或对象都会报错

```js
root.render((
    <div>
    	<p>逻辑表达式:{5&&8}</p>//可以
        <p>逻辑表达式:{0||1}</p>//可以
    	<p>三元表达式:{1 == '1'?'真':'假'}//可以
    	<p>数组1:{[1,2,3,4]}</p> //可以
		<p>函数: {function fn(){console.log(123)}}//报错
		<p>数组2：{[{id:1,title:'吃饭', isDone:false},{id:2,title:'睡觉', isDone:false}]}</p>
    </div>
))
```

####	4-4.条件渲染

>   单分支：使用 && 运算     if
>
>   双分支：if...else  三元表达式
>
>   多分支：封装成函数

插值语法渲染react元素

```js
const root = ReactDOM.createRoot(document.querySelector("#root"));
const myDiv = (<div id='box'>我是div</div>);//react元素
root.render((
    <div>
        {myDiv}//渲染
	</div>
```

```js
//单分支
const root = ReactDOM.createRoot(document.querySelector("#root"));
const myDiv = (<div id='box'>我是div</div>);//react元素
let flag = true;
root.render((
              <div>
              	{flag && myDiv}
              </div>
             ))
```

```js
//双分支
const root = ReactDOM.createRoot(document.querySelector("#root"));
let loading = false; // 加载标识符
root.render((
    <div>
		{loading ? <div>页面正在加载中....</div> : <div>正文内容</div>}
    </div>
    ))
```

```jsx
//多分支
function run(age){
    let style = null;
    if(age <= 3){
        style = <div>爬</div>
    }else if(age > 3 && age <= 7){
        style = <div>疯跑</div>
    }else if(age > 7 && age < 18){
        style = <div>飞</div>
    }
    return style;
}
root.render((
    <div>
    	 {run(2)}
         {run(6)}
    </div>
))
```

####	4-6.行内样式处理

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
/**
 * style行内样式写法：
 * 1. 对象：
 * 2. 复合属性需要使用小驼峰命名法
 * 3. px 带单位的，可以只写数字，省略px
 * 
 */
root.render((
    <div>
        <h3 style={{color:'red', fontSize:25}}>style行内样式处理</h3>
    </div>
))
```

####	4-7.class样式类名处理

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
let classNameStr1 = "c1"
let classNameStr2 = "c1 bg border1 wh"
let classNameArr = ['c1', 'bg', 'border1', 'wh'];
// 如果数组出现在标签内，当做子元素渲染，将数组元素拿出来挨个渲染
// 如果数组出现在标签属性上，当做属性渲染，那么数组元素挨个渲染中间用,隔开
root.render((
    <div>
        <div className={classNameStr1}>111</div>
        <div className={classNameStr2}>222</div>

        <div className={classNameArr}>数组 不生效</div>
        <div className={classNameArr.join(' ')}>数组 推荐</div>

    </div>
))
```

####  4-8.列表渲染

> 1. 列表渲染的核心思想：就是将普通数据的数组，通过map函数，映射成一个react元素的数组，利用react对于数组的渲染机制完成列表渲染
>
> 2. 列表渲染中的key, key用于react的diff算法，key值必须是一个唯一不重复的值，推荐使用id作为key值，也可以使用index索引作为key值，但是在某些场景下，使用索引会有问题【diff算法中详解】

用map映射实现数组列表渲染

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
let arr = [1, 2, 3, 4];
let newArr = arr.map((item, index) => (
    <li key={index}>
        {item}
    </li>
))
root.render((
    <div>
        {newArr}
    </div>
))
```

复杂数据类型的数组

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
let todos = [
    { id: 1, title: '吃饭', isDone: true },
    { id: 2, title: '睡觉', isDone: true },
    { id: 3, title: '敲代码', isDone: false }
]
let newTodos = todos.map(item => (
    <li key={item.id}>
        <p>标题: {item.title} <span>{item.isDone ? '已完成' : '未完成'}</span></p>
    </li>
))
root.render((
    <ul>
        {newTodos}
    </ul>
))

//使用最多
root.render((
    <ul>
        {todos.map(item => (//注意:箭头函数后面的括号写{}需要return,()不需要return
                <li key={item.id}>
                    <p>标题: {item.title} <span>{item.isDone ? '已完成' : '未完成'}</span></p>
                </li>
        ))}
    </ul>
))
```

####  4-9.jsx中的事件

>  jsx中绑定事件的方式，是通过标签属性的方式
>
>  on + 事件名[首字母大写] onClick onChange  onMousemove
>
>  onClick={函数名[函数的定义、函数堆内存的引用地址]}
>
>  react 会自定将事件对象传给函数的第一个形参
>
>  该形参事件对象，不是原生的事件对象，而是经过react包装过的事件对象，该事件对象拥有跟原生几乎一样属性。并且比原生的事件对象好用，已经做过兼容新处理了
>
>  如果你想使用原生的事件对象，在nativeEvent属性上获取
>
>  react事件回调阻止默认行为还是  e.preventDefault();
>
>  * 总结：
>  * 1. react事件回调函数调用者是window，所以打印this 是undefined
>  * 2. react事件插值语法中，只能填函数的定义
>  * 3. react事件回调函数的第一个形参，是事件对象
>  * 4. 如果想传递参数，需要外围包裹箭头函数
>  * 5. react 中的onChange 实际上是原生dom事件中的 onInput
>  * 6. 阻止默认行为： e.preventDefault()

> `注意!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`
>
> 函数的调用传的都是实参!!!!!!! 函数的定义才是形参!!!!!!
>
> 实参需要获得属性如event 必须要把event的属性名写全 才能传送到形参
>
> React与原生dom事件的调用方法 原生需要加括号调用 但在react中不需要!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
>
> React中的this指向是undefined,因为是严格模式,但是react事件回调函数的调用者是window`重要`
>
> 每一个事件中都会有event属性!!!!!!!!!!!!!!

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
function fn1(e) {
    console.log('fn1 e: ', e);
    // 
    e.preventDefault();
    console.log('this: ', this);// undefined 因为react使用的是严格 模式，指向window的都指向undefined，说明：react事件回调函数的调用者是 window 【重要】!!!!!!!!!!!!!!!!!!!
}

function fn2(a, b, c) {
    console.log('a:', a);
    console.log('b:', b);
    console.log('c:', c);
}

root.render((
    <div>
        <h3>click事件</h3>
        <button onClick={fn1}>点击</button>
        <a href="http://baidu.com" onClick={fn1}>百度</a>

        <h3>事件回调函数如何传递参数</h3>
        <button onClick={fn2}>传递参数问题</button>
        <hr />
        <button onClick={() => fn2(1, 2, 3)}>传递参数问题, 包裹一个箭头函数</button>
        <hr />
        <button onClick={(e) => fn2(e, 2, 3)}>即传递参数也想要事件对象</button>
        
        <button onClick={(e) => fn2(1, e, 3)}>即传递参数也想要事件对象</button>

        <h3>onchange  oninput</h3>
        <input type="text" name="" id="" onChange={(e) => {
            console.log('onChange e: ', e);
            console.log('onChange value: ', e.target.value);
        }} />
        <input type="text" name="" id="" onInput={(e) => {
            console.log('onInput e: ', e);
            console.log('onInput value: ', e.target.value);
        }} />
    </div>
))
```

原生dom事件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <input type="text" name = 'username' onchange="change(event)">
    <input type="text" name = 'age' oninput="input(event)">
    <script>
        /**
         * onchange事件调用时机：文本框内容改变，并且失去了焦点
         * 
         * 事件对象： Event对象
         */
        function change(e){
            //Event {isTrusted: true, type: 'change', target: input, currentTarget: input, eventPhase: 2, …}
            console.log('onchange下的e:',e);
            //<input type="text" name = 'username' onchange="change(event)">
            console.log(e.target);//拿到的数据是元素本身
            console.log('onchange:',e.target.value);//拿到输入的文字
        }
         /**
         * oninput 调用时机：文本框内容改变即调用
         * 
         * 事件对象：InputEvent
         */
        function input(e){
            console.log('oninput下的e:',e);
            console.log('oninput:',e.target.value);
        }
    </script>
</body>
</html>
```

> 注意:在原生dom事件中,调用函数的this指向为window,但是在React中,指向undefined,因为react使用了严格模式

####		4-10.jsx中的注释

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render((
    <div>
        <h3>单行注释</h3>
        {//单行注释最少要两行
        }
        <h3>多行注释</h3>
        {/*多行注释*/}
        <h3>属性注释</h3>
        <div /*id='box' className='c1' */>我是div</div>
    </div>
))
```

####  4-11.jsx中的文档碎片

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
// 写法一
// root.render((
//     <React.Fragment>
//         <div>11</div>
//         <span>22</span>
//         <p>33</p>
//     </React.Fragment>
// ))
// 写法二
const {Fragment} = React;
root.render((
    <Fragment>
        <div>11</div>
        <span>22</span>
        <p>33</p>
    </Fragment>
))

// 写法三【推荐】
root.render((
    <>
        <div>11</div>
        <span>22</span>
        <p>33</p>
    </>
))
```

###	5.组件初识

> 什么是组件？ 组件就是组成页面的一个独立的部分，由 html、css、js及静态资源构成
>
> 在react中，组件有两大类，类组件、函数组件
>
> 类组件在16.4之前是主流的开发方式
>
> 函数组件在16.8以后至今，是主流的开发方式

####	5-1.类组件

怎样去创建一个类组件呢?

> 组件：
> 页面中组成整体的一个独立的部分，包括【html + css + js + 静态资源】
> 
> 1. 类组件[16.4]：
>    - 类组件的定义
>    1-1. 类组件本质上就是一个 类，类名首字母大写，类名就是组件名
>    1-2. 类组件必须继承 React.Component 类
>    1-3. 类组件必须要有render方法
>    1-4. render方法中必须有 return，return的内容 99%都是react元素
>    - 类组件的调用：使用jsx语法
>    1-1. 单标签调用：<组件名/>
>    1-2. 对标签调用：<组件名></组件名>
>    - 使用组件标签调用发生了什么？
>    1. 发现组件调用标签后，会查找该组件的定义
>    2. 如果是类组件，会实例化该类组件，产生一个该类组件的实例化对象
>    3. 使用该实例化对象调用 render方法
>    4. render函数中的return返回值会替换掉 组件调用标签
> 2. 函数组件[16.8 hook]：

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
class Header extends React.Component {
    render() {
        console.log('Header render this: ' ,this);
        return (
            <div className="header">
                我是header
            </div>
        )
    }
}
root.render((
    <>
        <Header />
        <div className="content">
            我是内容
        </div>
        <div className="footer">
            我是底部
        </div>
    </>
))
```

#####	5-1-1.模拟类组件render的过程

> 类组件实例化，实例化后会调用render方法，所以render方法的this永远指向当前类组件的实例对象

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));

    class Header extends React.Component{
        render(){
            return (
                <div>Header 组件</div>
            )
        }
    }
    // root.render(<Header/>)

    function render(Com, root){
        console.dir(Com);// 类组件标签调用的结果，也是一个react元素
        const instance = new Com.type(); // 实例化类组件
        console.log(instance);// Header的实例对象
        const vdom = instance.render(); // 调用render方法
        console.log(vdom);

        const realDom = document.createElement(vdom.type); // 创建真实dom节点
        realDom.innerHTML = vdom.props.children;// 添加内容
        root.appendChild(realDom);//渲染到页面
    }
    let rootDom = document.querySelector('#root');
    render(<Header/>, rootDom);
```

####		5-2.函数组件

> 函数组件的定义：
>  *  1. 函数组件本质就是一个函数，函数名首字母大写，函数名就是组件名
>  *  2. 函数组件必须有return语句，并且return的内容 99% 都是react元素
>  * 函数组件的调用:
>  *  1. <组件名/>
>  *  2. <组件名></组件名>
>  * 函数组件调用执行过程：
>  *  1. 在jsx中发现有首字母大写的标签调用，查找该组件的定义
>  *  2. 发现是函数组件，执行该函数
>  *  3. 函数的返回值替换掉组件标签调用的位置

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
function Header(){
    return (
        <div>我是Header组件</div>
    )
}
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render((
    <div>
        <Header></Header>
    </div>
))
```

#####		5-2-1.模拟函数组件调用渲染过程

```jsx
function Header(){
    return (
        <div>我是Header组件</div>
    )
}

function render(Com, root){
    console.dir(Com);
    const vdom = Com.type();
    console.log('vdom: ', vdom);

    const realDom = document.createElement(vdom.type);
    realDom.innerHTML = vdom.props.children;
    root.appendChild(realDom);
}
const rootDom = document.querySelector('#root');
render(<Header/>, rootDom)
```

####		5-3类组件和函数组件的区别

> ​                                        类组件                                    函数组件
>
> 1. state：                   有状态数据                            本身没有【通过hook扩展】
> 2. 生命周期：           有生命周期                            本身没有【通过hook扩展】
> 3. this指向                 有this->当前实例                   没有this，undefined

#		React脚手架

##	6-1.使用脚手架创建项目

> 1. 安装：全局安装脚手架 
>    - npm： `npm i -g create-react-app`
>    - yarn: `yarn add global create-react-app`
> 2. 使用脚手架构建项目：
>    - npm: `create-react-app 项目名`
>    - yarn: `yarn create react-app 项目名`
> 3. 启动项目
>    1. <font color='red'>进入项目目录</font>：
>    2. npm start 

###		6-1-1.项目目录及文件

```
react_scaffold                                  项目根目录
   |- node_modules                              项目依赖包        
   |- public                                    网站静态资源目录
   |    |- favicon.ico                          站点图标
   |    |- index.html							网站入口html文件
   |    |- logo192.png 							manifest.json要用的移动端图标
   |    |- logo512.png							manifest.json要用的移动端图标
   |    |- manifest.json						移动端的配置文件
   |    |- robots.txt							可以爬取网站哪些内容
   |-src										源码开发目录
   |  |- App.css								App根组件样式文件
   |  |- App.js									App根组件
   |  |- App.test.js							测试文件
   |  |- index.css								全局公共样式文件
   |  |- index.js								js的入口文件
   |  |- logo.svg								项目启动后旋转的react图标
   |  |- reportWebVitals.js						google的一个报告文件
   |  |- setupTests.js							测试启动文件
   |- .gitignore								git忽略文件
   |- package-lock.json							npm依赖包锁文件
   |- package.json								npm的配置文件
   |- README.md									项目说明文件
```

##		6-2.目录精简

```
项目
 |- public
 |   |-index.html
 |   |-favicon.ico
 |- src
 |   |- index.js
 |   |- App.jsx
```

public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

src/index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
```

src/App.jsx

```jsx
function App() {
    return (
        <>
            App
        </>
    );
}
export default App;
```

##  6-3组件

###		6-3-1.类组件

类组件状态数据state

> 1. 怎么定义状态数据？
>
>    就是类组件的一个私有属性 state
>
> 2. 怎么读取状态数据？
>
> 3. 怎么改变状态数据？

类组件状态数据的定义和读取

> 类组件的状态数据定义在它的私有属性 state上
>
> 读取也是直接从state上读取

```jsx
class ClassState extends Component{
    constructor(){
        //1. 调用父类的构造器
        super();
        //2. 定义状态数据
        this.state = {
            count:100,
            msg:'atguigu'
        }
    }
    render(){
        console.log('this.state: ',this.state);
        let {count, msg} = this.state;// 先解构在使用
        return (
            <div>
                <h3>Class 类组件 的状态数据的读取</h3>
                <p>count: {this.state.count} - {count}</p>
                <p>msg: {this.state.msg} - {msg}</p>
            </div>
        )
    }
}
export default ClassState;
```

定义状态的方式二

```jsx
import React, {Component} from 'react'

class ClassState extends Component{
    // 定义状态的方式二
    state = {
        count:1001,
        msg:'atguigu'
    }
    render(){
        console.log('this.state: ',this.state);
        let {count, msg} = this.state;// 先解构在使用
        return (
            <div>
                <h3>Class 类组件 的状态数据的读取</h3>
                <p>count:{count}</p>
                <p>msg:{msg}</p>
            </div>
        )
    }
}
export default ClassState;
```

修改状态数据及事件回调的this指向问题

> ​	this.setState(新的状态对象)
>
> react的事件回调函数的调用者是 window，所以要想让事件回调函数中的this指向当前组件的实例对象，有以下手段：
>
> 1. bind[推荐]：通过bind改变this指向，原理：使用的是render中的this
> 2. 包裹箭头函数[推荐]：原理：也是使用的render中的this
> 3. 直接定义成箭头函数[不推荐]：原理：使用的是constructor中的this
