const express = require('express')

const app = express()
const todoModel = require('./db/model/todoModel')
// app.use((request, response, next)=>{
//     response.setHeader('Access-Control-Allow-Origin','*')
//     response.setHeader('Access-Control-Allow-Headers','*')
//     response.setHeader('Access-Control-Allow-Methods','*')
//     next()
// })
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// 获取所有todos
app.get('/todos', async (request, response)=>{
    console.log(123)
    let todos = await todoModel.find({}).sort({id:-1}).exec()
    response.json({
        code:0,
        todos
    })
})
// 添加todo
app.post('/todos', async (request, response)=>{
    let todo = await todoModel.create(request.body) // {title,isDone}
    response.json({
        code:0,
        todo, //{_id, title, isDone}
        msg:'添加成功'
    })
})

// 根据id删除  /todos/1
app.delete('/todos/:_id', async (request, response)=>{
    let {_id} = request.params
    await todoModel.deleteOne({_id})
    response.json({
        code:0,
        msg:'删除成功'
    })
})

// 根据id 改isDone   patch  put
app.patch('/todos/:_id', async (request, response)=>{
    let {_id} = request.params
    let payload = request.body //{isDone:false}
    console.log(_id, payload)
    await todoModel.updateOne({_id},payload) // {isDone:false}
    response.json({
        code:0,
        msg:'更新成功'
    })
})

// checkAll
app.patch('/checkAll', async (request,response)=>{
    let {isDone} = request.body // {isDone}
    await todoModel.updateMany({},{isDone:isDone})
    response.json({
        code:0,
        msg:'操作成功'
    })
})

// deleteChecked
app.get('/deleteChecked', async(request, response)=>{
    await todoModel.deleteMany({isDone:true})
    response.json({
        code:0,
        msg:'删除成功'
    })
})

app.listen(7000,()=>{
    console.log('server run at 7000')
})