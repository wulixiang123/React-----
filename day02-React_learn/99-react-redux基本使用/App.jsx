import React from 'react'
import { addNum } from './store/slice/countSlice'//拿到方法
import {useSelector,useDispatch} from 'react-redux'//3.解构出俩方法

    /**
     * useSelector: 
     * 作用：获取store仓库中的数据
     * 接收一个回调函数作为参数、useSelector(回调函数)
     * 回调函数的参数，是store全部数据对象
     * 回调函数的返回值，是useSelector 的返回值 
     */

export default function App() {
    // useSelector(state=>{
    //   console.log(state);//{count: {…}}//也是拿到仓库中的值
    // })

    let {num} = useSelector(state=>state.count)//拿到仓库中的值

    /**
     * useDispatch:
     * 作用：获得一个dispatch函数，功能跟 store.dispatch一样,与之不同的是可以调用方法重新渲染页面
     */

    const dispatch = useDispatch()//创建了一个dispatch函数

  return (
    <div>
        <p>num:{num}</p>
        <p><button onClick={()=>{
            dispatch(addNum(5))
        }}>点我+5</button></p>
    </div>
  )
}
