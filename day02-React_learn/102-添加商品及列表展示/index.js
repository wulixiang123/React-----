import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//1. 安装 npm i react-router-dom  2. 导入
import { BrowserRouter } from 'react-router-dom';
// 导入Provider与store
import {Provider} from 'react-redux'
import store from './store'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);



