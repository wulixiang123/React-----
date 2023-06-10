import {request} from "@utils/http"
import { IHospitalSetParams, IHospitalSetResponse,IAddHospitalSetParams } from "./model/hospitalSetTypes"

export const getHospitalSetList = ({page,limit,hosname,hoscode}:IHospitalSetParams) => {
    return request.get<any,IHospitalSetResponse>(`/admin/hosp/hospitalSet/${page}/${limit}`,{
        params:{
            hosname,
            hoscode
        }
    })
}

export const addHospitalSet = (data:IAddHospitalSetParams)=>{
    return request.post<any,null>('/admin/hosp/hospitalSet/save', data)
}