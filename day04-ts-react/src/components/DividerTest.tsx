import React from 'react'
import {Divider} from 'antd'
export default function DividerTest() {
  return (
    <div>
        <h3>分割线</h3>
        <Divider />
        <Divider dashed />
        <Divider>Text</Divider>
        <Divider orientation="left">Left Text</Divider>
    </div>
  )
}
