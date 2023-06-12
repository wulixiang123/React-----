import {request} from '@utils/http'
import { IDistrictList, IHospitalDetailResponse, IHospitalListParams, IHospitalListResponse } from './model/hospitalListType'
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