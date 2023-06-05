import React from 'react';
import ReactDOM from 'react-dom/client';
//1. 安装 npm i react-router-dom  2. 导入
import { BrowserRouter } from 'react-router-dom'
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // 3. 包裹跟组件App
    <BrowserRouter>
        <App />
    </BrowserRouter>
);



