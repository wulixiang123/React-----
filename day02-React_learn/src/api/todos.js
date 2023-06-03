import request from '../http'
/**
 * 获取todos列表数据
 * @returns 
 */
export const getTodos = ()=>{
    return request.get('/todos')
}
/**
 * 根据id删除todo
 * @param {*} id 
 * @returns 
 */
export const deleteById = id=>{
    return request.delete('/todos/' + id)
}
/**
 * 添加todo
 * @param {*} todo  {title:xxx, isDone:false}
 * @returns 
 */
export const addTodo = todo=>{
    return request.post('/todos', todo)
}
/**
 * 根据id修改todo状态
 * @param {*} id 
 * @param {*} isDone 最新的完成状态
 * @returns 
 */
export const checkOne = (id,isDone)=>{
    return request.patch('/todos/' + id, {isDone})
}