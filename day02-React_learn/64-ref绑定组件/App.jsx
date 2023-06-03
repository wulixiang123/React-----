import React, { useRef } from 'react'
import ClassTest from './components/ClassTest';
import FunTest from './components/FunTest';
/**
 * ref可以给类组件绑定，绑定后可以获取类组件的实例对象
 * 
 * 函数组件本身不能够绑定ref属性，但是使用 React.forwardRef处理后可以绑定
 * 
 * 使用React.forwardRef 绑定ref后，可以将 ref对象传递给函数组件，在函数组件内部绑定react元素，获取函数子组件中的真实dom元素
 * 让父组件可以获取到函数子组件的真实DOM元素
 */
export default function App() {
    let classRef = useRef();
    let funRef = useRef('sdkfjas');
    return (
        <div>
            <h3>类组件</h3>
            <ClassTest ref={classRef} />

            <FunTest ref={funRef}/>

            <button onClick={()=>{
                console.log('类组件ref: ', classRef)
                console.log('函数组件ref: ', funRef)
                funRef.current.style.color = 'red'
            }}>获取 ref</button>
        </div>
    )
}
