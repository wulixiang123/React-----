import React, { Component } from 'react'

export default class Button extends Component {
  render() {
    console.log(this.props);
    let {children} = this.props
    return (
      <button>{children}</button>
    )
  }
}

// rcc可以快速创建上面代码~~~~