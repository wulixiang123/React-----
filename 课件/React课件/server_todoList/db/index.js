const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/todoList')

mongoose.connection.on('open',()=>{
    console.log('数据库链接成功')
})

mongoose.connection.on('error',()=>{
    console.log('数据库连接失败')
})

module.exports = mongoose