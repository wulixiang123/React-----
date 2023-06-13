const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
// 1. 将所有404的相应，重定向到 index.html
app.use(history());

// 2. 设置静态资源目录
app.use(express.static(__dirname));

// 3. 进行跨域设置
app.use('/prod-api', createProxyMiddleware(
    {
        target: "http://syt-api.atguigu.cn", // 目标服务器地址
        changeOrigin: true, // 允许跨域
        pathRewrite: {
            // 路径重写
            "^/prod-api": "",
        },
    }))
app.listen(8080, () => {
    console.log('server run at 8080');
})