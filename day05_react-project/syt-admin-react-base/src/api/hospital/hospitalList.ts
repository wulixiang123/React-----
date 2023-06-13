import {request} from '@utils/http'
import { IDepartmentList, IDistrictList, IDoctorList, IHospitalDetailResponse, IHospitalListParams, IHospitalListResponse, IScheduleResponse } from './model/hospitalListTypes'
/**
 * 获取地区列表
 * @param id 
 * @returns 
 */
export const getDistrictList = (id:string | number)=>{
    return request.get<any,IDistrictList>('/admin/cmn/dict/findByParentId/' + id)
}
/**
 * 获取医院列表分页数据
 * @param param0 
 * {page:当前页,limit：每页几条,hosname,hoscode,hostype,provinceCode,cityCode,districtCode,status}
 */
export const getHospitalList = ({page,limit,hosname,hoscode,hostype,provinceCode,cityCode,districtCode,status}:IHospitalListParams)=>{
    return request.get<any, IHospitalListResponse>(`/admin/hosp/hospital/${page}/${limit}`,{
        params:{
            hoscode,
            hosname,
            hostype,
            provinceCode,
            cityCode,
            districtCode,
            status
        }
    })
}
/**
 * 根据id获取医院详情数据
 * @param id 
 * @returns 
 */
export const getHospitalDetail = (id:string)=>{
    return request.get<any, IHospitalDetailResponse>('/admin/hosp/hospital/show/' + id)
}

// 切换医院上线下线状态
export const toggleState = (id:string,status:number)=>{
    return request.get<any,null>(`/admin/hosp/hospital/updateStatus/${id}/${status}`)
}

// 根据医院编号获取科室列表
export const getDepartmentList = (hoscode:string) => {
    return request.get<any,IDepartmentList>('/admin/hosp/department/' + hoscode)
}

// 科室排班日期分页数据
export const getScheduleList = (page:number,limit:number,hoscode:string,depcode:string)=>{
    return request.get<any, IScheduleResponse>(`/admin/hosp/schedule/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`)
}

// 获取排班医生列表
export const getDoctorList = (hoscode:string,depcode:string,workDate:string)=>{
    return request.get<any,IDoctorList>(`/admin/hosp/schedule/findScheduleList/${hoscode}/${depcode}/${workDate}`)
}
