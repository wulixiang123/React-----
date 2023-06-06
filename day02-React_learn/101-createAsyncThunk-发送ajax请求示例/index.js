import React from 'react'
import ReactDOM from 'react-dom/client'
// 1. 安装 react-redux
// 2. 导入Provider组件
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render((
    // 3.包裹App根组件，并绑定store属性
    <Provider store={store}>
        <App />
    </Provider>
))

