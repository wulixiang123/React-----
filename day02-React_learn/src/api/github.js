import request from "../request";
export const getTotal = (keyword)=>{
    return request.get('/search/users',{
        params:{
            q:keyword
        }
    })
}