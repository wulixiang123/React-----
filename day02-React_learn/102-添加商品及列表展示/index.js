import React from 'react';
import ReactDOM from 'react-dom/client';
//1. 安装 npm i react-router-dom  2. 导入
import { BrowserRouter } from 'react-router-dom'
// 导入Provider
import { Provider } from 'react-redux'
// 导入store
import store from './store'
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);



