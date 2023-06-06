import React from 'react'
import {addNum} from './store/slice/countSlice'
import {useSelector,useDispatch} from 'react-redux'
export default function App() {
   /**
     * useSelector: 
     * 作用：获取store仓库中的数据
     * 接收一个回调函数作为参数、useSelector(回调函数)
     * 回调函数的参数，是store全部数据对象
     * 回调函数的返回值，是useSelector 的返回值 
     *
     * 
     */
    // let res = useSelector(state=>{
    //     console.log('state:', state);
    //     return 111;
    // })
    // console.log('res:' ,res);

    // let state = useSelector(state=>state); // 获取整个仓库的数据
    let {num} = useSelector(state=>state.count);// 获取count切片中的num数据

    /**
     * useDispatch:
     * 作用：获得一个dispatch函数，功能跟 store.dispatch一样
     * 
     */

    const dispatch = useDispatch();// 创建了一个dispatch函数
  return (
    <div>
        <p>num:{num}</p>
        <p><button onClick={()=>{
            dispatch(addNum(1))
        }}>num+1</button></p>
    </div>
  )
}
