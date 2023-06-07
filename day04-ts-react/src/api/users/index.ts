import request from "../../request";
import {IResponse} from './model/userTypes'

export const getUsers = (name:string)=>{
    return request.get<any,IResponse>('/search/users',{
        params:{
            q:name
        }
    })
}