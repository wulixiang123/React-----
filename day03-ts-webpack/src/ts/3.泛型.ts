/**
 *  泛型：就是能够接收类型的参数
 * 
 *  在定义函数的时候，并不知道类型是什么，只要在调用的时候才知道类型。就要使用泛型
 * 
 *  泛型变量 K T V S R A  
 */
function createArr<T>(item:T, count:number):T[]{
    let arr:T[] = []
    for(let i = 0; i < count; i++){
        arr.push(item)
    }
    return arr;
}

console.log(createArr<string>('a',3));// ['a','a','a']  ==> string[]
console.log(createArr<number>(6,2)); // [6,6] ==> number[]


/**
 * 泛型接口：
 * 
 */

interface IResponse<T>{
    code:number;
    msg:string;
    data:T
}

interface IBook{
    id:number;
    title:string;
    content:string;
}
interface ITodo{
    id:number;
    title:string;
    isDone:boolean;
}
let response1:IResponse<IBook> = {
    code:200,
    msg:'成功',
    data:{
        id:1,
        title:'重生80之我的媳妇有点辣！',
        content:'夏晓兰醒来后，发现自己进入了一个妙龄少女的身体'
    }
}
let response2:IResponse<ITodo> = {
    code:200,
    msg:'成功',
    data:{
        id:2,
        title:'吃饭',
        isDone:true
    }
}


export {}