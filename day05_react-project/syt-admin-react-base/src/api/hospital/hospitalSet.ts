// 医院设置相关请求方法
import {request} from "@utils/http"
import { IHospitalSetParams, IHospitalSetResponse,IAddHospitalSetParams, IHospitalSetItem } from "./model/hospitalSetTypes"

export const getHospitalSetList = ({page,limit,hosname,hoscode}:IHospitalSetParams) => {
    return request.get<any,IHospitalSetResponse>(`/admin/hosp/hospitalSet/${page}/${limit}`,{
        params:{
            hosname,
            hoscode
        }
    })
}

// 添加医院设置
export const addHospitalSet = (data:IAddHospitalSetParams)=>{
    return request.post<any,null>('/admin/hosp/hospitalSet/save', data)
}
//根据id删除医院设置
export const deleteById = (id:string | number) => {
    return request.delete('admin/hosp/hospitalSet/remove/' + id)
}
// 根据id获取医院设置数据
export const getHospitalSetById = (id:string | number) => {
    return request.get<any,IHospitalSetItem>('/admin/hosp/hospitalSet/get/' + id)
}