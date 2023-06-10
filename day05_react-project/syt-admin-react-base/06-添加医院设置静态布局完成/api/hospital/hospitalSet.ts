import {request} from "@utils/http"
import { IHospitalSetParams, IHospitalSetResponse } from "./model/hospitalSetTypes"

export const getHospitalSetList = ({page,limit,hosname,hoscode}:IHospitalSetParams) => {
    return request.get<any,IHospitalSetResponse>(`/admin/hosp/hospitalSet/${page}/${limit}`,{
        params:{
            hosname,
            hoscode
        }
    })
}