import React, { Component } from 'react'
import styles from './index.module.css'
console.log('styles: ', styles);
export default class Header extends Component {
  render() {
    return (
      <div className={styles.box}>index</div>
    )
  }
}
