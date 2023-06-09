/**
 * 医院设置相关请求方法
 */
import {request} from '@utils/http'
import { IHospitalSetParams, IHospitalSetResponse } from './model/hospitalSetTypes'
/**
 * 获取医院设置分页数据接口
 * @param param0 {page:当前页,limit:每页几条,hosname:医院名,hoscode:医院编号}
 * @returns 
 */
export const getHospitalSetList = ({page,limit,hosname,hoscode}:IHospitalSetParams)=>{
    return request.get<any,IHospitalSetResponse>(`/admin/hosp/hospitalSet/${page}/${limit}`,{
        params:{
            hosname,
            hoscode
        }
    })
}