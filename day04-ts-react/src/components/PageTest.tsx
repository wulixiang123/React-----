import React from 'react'
import  {Pagination} from 'antd'
export default function PageTest() {
  return (
    <div>
        <h3>分页</h3>
        <Pagination defaultCurrent={1} total={50} showQuickJumper={true} showSizeChanger={true} pageSizeOptions={[5,10,20]}/>
    </div>
  )
}
