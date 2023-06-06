// 为了解决渲染问题,需要用到react-redux
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import {Provider} from 'react-redux'//1.下载并引入
import store from "./store";
const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render((
    // 2.包裹根组件,并绑定store属性
    <Provider store={store}>
        <App/>
    </Provider>
    
))