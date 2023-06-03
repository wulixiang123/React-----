import React, { useContext } from 'react'
import Son from './Son'
// 6.引入context
import context from '../context'
export default function Father() {
  // 7.使用useContext(context)来接收value的数据
  let data = useContext(context)
  console.log('Father组件中接收的数据:',data);
  console.log(
    `%c⭐️gitee：https://gitee.com/liuyuanbobo/react.git 
⭐️git:https://github.com/wulixiang123/React-----.git
💕💗感谢关注！`,
    "font-size:20px; background:#FFF; color:#0034a6;padding:10px; border: 3px solid #0034a6;border-radius:10px;"
  );
  return (
    <div>
      <h3>Father</h3>
      <Son/>
    </div>
  )
}
