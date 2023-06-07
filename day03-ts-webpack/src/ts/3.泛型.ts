function createArr<T> (item:T,count:number):T[]{
    let arr:T[] = []
    for(let i = 0;i < count; i++){
        arr.push(item)
    }
    return arr
}
console.log(createArr<string>('bb',2));


interface resType<T>{
    code:number,
    msg:string,
    data:T
}
interface dataType{
    id:number,
    title:string,
    content:string
}

let response1:resType<dataType> = {
    code:200,
    msg:'成功',
    data:{
        id:1,
        title:'重生80之我的媳妇有点辣！',
        content:'夏晓兰醒来后，发现自己进入了一个妙龄少女的身体'
    }
}

interface ITodo{
    id:number,
    title:string,
    isDone:boolean
}

let response2:resType<ITodo> = {
    code:200,
    msg:'成功',
    data:{
        id:2,
        title:'吃饭',
        isDone:true
    }
}

// 理解:  <> 泛型: 就是能够接收类型的参数 
// 也可理解为谁返回值就定义在谁身上
// 对象嵌套对象的时候可以使用
// 在定义函数的时候，并不知道类型是什么，只有在调用的时候才知道类型。就要使用泛型