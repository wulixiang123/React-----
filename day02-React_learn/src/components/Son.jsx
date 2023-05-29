import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class Son extends Component {
  static propTypes = {
    count:PropTypes.number,
    msg:PropTypes.string.isRequired
  }
  static defaultProps = {
    count:100
  }
  render() {
    let {count,msg} = this.props
    return (
      <div>
        <h3>Son:</h3>
        <p>count:{count*3}</p>
        <p>msg:{msg}</p>
      </div>
    )
  }
}


// rcc可以快速创建上面代码~~~~