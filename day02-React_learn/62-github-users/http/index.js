/**
 * 对axios进行二次封装
 */

import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 进行基础配置
const instance = axios.create({
    baseURL:'https://api.github.com',
    timeout:20000
})

// 配置请求拦截器
instance.interceptors.request.use(config=>{
    // 请求头携带公共参数token
    let token = localStorage.getItem('token')
    if(token){
        config.headers.token = token;
    }
    // 开启loading效果
    NProgress.start();
    return config;
})

// 响应拦截器
instance.interceptors.response.use(response=>{
    // if(response.status === 401){ // 说明没有权限或token过期
    //     location.href = '/login.html' // 重定向到登录页面
    // }
    // 关闭loading
    NProgress.done();
    return response.data;// 简化服务器数据
}, error=>{
    NProgress.done();
    console.log('出错了xxxx'); // 进行统一错误处理
    return new Promise(()=>{});//阻止错误继续向下传递
})

export default instance;

