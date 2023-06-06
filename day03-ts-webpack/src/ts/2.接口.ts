console.log('接口学习')

/**
 * 接口：interface  接口的名字 I 
 * 作用：限定对象类型的
 * 
 */

interface IPerson{
    name:string
    age:number
    sex?:string
}

let p:IPerson = {
    name:'atguigu',
    age:19
}

let p2:IPerson = {
    name:'尚硅谷',
    age:20,
    sex:'boy'
}

/**
 * 
 *  todos = [
 *      {id:xxx, title:'吃饭', isDone:true},
 *      {id:xxx, title:'睡觉', isDone:false}
 *  ]
 * 
 *  需求：定义todos的类型
 *  如何定义数组的类型：
 *  1. 定义数组中每一个元素的类型 interface
 *  2. 使用type 自定义数组的类型
 *  
 */

interface ITodoItem { 
    id:string;
    title:string;
    isDone:boolean;
}

type ITodos = ITodoItem[]

let todos:ITodos = [
    {id:'sdfx', title:'吃饭', isDone:true},
    {id:'sdf1235', title:'睡觉', isDone:false}
]







export {}