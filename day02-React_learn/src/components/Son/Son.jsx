import React, { Component } from 'react'
import styles from './index.module.css'
console.log(styles);
export default class Son extends Component {
  render() {
    return (
      <div className={[styles.box,'bg','cl'].join(' ')}>
        <button type='button' className='btn btn-default'>保存</button>
      </div>
    )
  }
}
