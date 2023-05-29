const  mongoose = require('../index')

const todoSchema = new mongoose.Schema({
    title:String,
    isDone:Boolean
})

const todoModel = mongoose.model('todoList',todoSchema,'todoList')

module.exports = todoModel