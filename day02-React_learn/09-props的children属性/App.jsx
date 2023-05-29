import React, { Component } from 'react'
import Button from './components/Button'

export default class App extends Component {
  render() {
    return (
      <div>
        <Button>保存</Button>
        <Button>取消</Button>
        <Button>提交</Button>
      </div>
    )
  }
}
