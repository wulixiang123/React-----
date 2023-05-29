

### useContext

> 作用：在接收context传递数据的组件中，使用useContext快速拿到数据

```jsx
-- context.js
import React from 'react'
export default React.createContext()

-- App.jsx
export default class App extends Component{
    render(){
        return (
        	<textContext.Provider value={{name:'zs'}}>	
            	<Test></Test>
            </textContext.Provider>
        )
    }
}

-- Test.jsx
import React, {useContext} from 'react'
import testContext from './content'
export default function Test(){
    const context = useContext(testContext)
    console.log(context)
    return <div></div>
}
```



### useRef

>新的创建ref对象的方式

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(); // 传入的null表示inputEl.current的初始值
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```



### useReducer

>组件中有大量数据,使用useState,略显繁琐,使用useReducer更方便的管理数据

```js
import React, { useReducer } from 'react'

const initialState = { count: 0, msg: '哈哈' }

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + 1,
      }
    case 'decrement':
      return {
        ...state,
        count: state.count - 1,
      }
    default:
      throw new Error()
  }
}
export default function Test1() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      Count: {state.count}
      msg: {state.msg}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  )
}

// useReduder的第三个参数:

function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}


```

### useCallBack

> ​	每次函数组件更新,函数组件内的函数会重新创建.使用useCallBack可以缓存函数

```js
import React, { useState, useCallback } from 'react'
export default function Test() {
  console.log('test渲染了')
  const [count, setCount] = useState(0)
  // 如果是空数组则回调函数只创建一次.如果不写第二个参数,或第二个参数监听数据,回调函数则创建多次
  const handle = useCallback(() => {
    console.log(count)
    setCount(count + 1)
  }, [count])
  return (
    <div>
      <div>{count}</div>
      <button onClick={handle}>按钮</button>
    </div>
  )
}

```



### React.memo

>作用类似于类组件的PureComponent, 当父组件更新时,动态判断子组件使用更新
>
>PureComponent: 当自身状态数据[state]和外部数据[props]没有变化的时候，组件不重新渲染

```js
--App.js  

import React, { useState, useEffect } from 'react'
import Test from './Test'
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //含最大值，含最小值
}
class App extends React.Component {
  state = {
    count: 0,
  }
  render() {
    console.log('app渲染了')
    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              count: getRandomIntInclusive(1, 2),
            })
          }}
        >
          按钮
        </button>
        <Test count={this.state.count}></Test>
      </div>
    )
  }
}

export default App


-- Test.js 
import React from 'react'

function Test(props) {
  console.log('Test组件渲染了-' + props.count)
  return <div>{props.count}</div>
}
export default React.memo(Test)
```



### useMemo

>会缓存一个计算的结果,如果没有变化,则不会重新执行计算

```js
// 使用前
import React,{useState} from 'react';
 
export default function WithoutMemo() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');
 
    function expensive() { // expensive 昂贵的
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }
 
    return <div>
        <h4>{count}-{val}-{expensive()}</h4>
        <div>
            <button onClick={() => setCount(count + 1)}>+c1</button>
            <input value={val} onChange={event => setValue(event.target.value)}/>
        </div>
    </div>;
}

// 使用后
export default function WithMemo() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');
    const expensive = useMemo(() => {
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }, [count]);
 
    return <div>
        <h4>{count}-{expensive}</h4>
        {val}
        <div>
            <button onClick={() => setCount(count + 1)}>+c1</button>
            <input value={val} onChange={event => setValue(event.target.value)}/>
        </div>
    </div>;
}
```

### useImperativeHandle

>`useImperativeHandle` 可以让你在使用 `ref` 时自定义暴露给父组件的实例值. `useImperativeHandle` 应当与 [`forwardRef`]一起使用
>
>作用: 封装公共组件的时候,可以给使用公共组件的组件提供指定的API. 有条件的操作公共组件的真实dom

```js
--App.js
import React, { useState, useEffect } from 'react'
import FancyInput from './FancyInput'

const inputRef = React.createRef()
class App extends React.Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            
            console.log(inputRef.current.focus())
          }}
        >
          按钮
        </button>
        <FancyInput ref={inputRef}></FancyInput>
      </div>
    )
  }
}

export default App


--FancyInput.js
import React, { useRef, useImperativeHandle, forwardRef } from 'react'
function FancyInput(props, ref) {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
        
      inputRef.current.focus()
    },
  }))
  return <input ref={inputRef} />
}
FancyInput = forwardRef(FancyInput)
export default FancyInput

```



### useLayoutEffect

>作用与 `useEffect` 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，`useLayoutEffect` 内部的更新计划将被同步刷新。

```js
useEffect
这个是在render结束后,你的callback函数执行,但是不会阻塞浏览器渲染

useLayoutEffect
这个是用在处理DOM的时候,当你的useEffect里面的操作需要处理DOM,并且会改变页面的样式,就需要用这个,否则可能会出现出现闪屏问题, useLayoutEffect里面的callback函数会在DOM更新完成后立即执行,但是会在浏览器进行任何绘制之前运行完成,阻塞了浏览器的绘制

import React, { useEffect, useLayoutEffect, useRef } from 'react'
import TweenMax from 'gsap' // npm i gsap@3.7.0
import './index.css'

const Animate = () => {
  const REl = useRef(null)
  useLayoutEffect(() => {
    /*下面这段代码的意思是当组件加载完成后,在0秒的时间内,将方块的横坐标位置移到600px的位置*/
    TweenMax.to(REl.current, 0, { x: 600 })
  }, [])
  return (
    <div className="animate">
      <div ref={REl} className="square">
        square
      </div>
    </div>
  )
}

export default Animate
```



### useDebugValue

>useDebugValue 可用于在 React 开发者工具中显示 自定义 hook 的标签
>
>注意:只能在自定义hook中使用

```js

import { useState, useDebugValue } from 'react'
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //含最大值，含最小值
}

export default function useFriendStatus() {
  const [isOnline, setIsOnline] = useState(null)

  setTimeout(() => {
    let result = getRandomIntInclusive(0, 1)
    console.log(result)
    setIsOnline(result ? 'online' : 'offline')
  }, 1000)

  // 在react开发者工具中的这个 Hook 旁边显示标签
  // "FriendStatus: Online"
  useDebugValue(isOnline)

  return isOnline
}

```

