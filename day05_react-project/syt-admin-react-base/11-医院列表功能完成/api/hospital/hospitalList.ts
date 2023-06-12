import {request} from '@utils/http'
import {IDistrictList,IHospitalListParams, IHospitalListResponse} from './model/hospitalListType'

// 获取地区列表
export const getDistrictList = (id:string | number) =>{
    return request.get<any,IDistrictList>('/admin/cmn/dict/findByParentId/' + id)
}

// 获取医院列表分页数据

export const getHospitalList = ({page,limit,hosname,hoscode,hostype,provinceCode,cityCode,districtCode,status}:IHospitalListParams)=>{
    return request.get<any,IHospitalListResponse>(`/admin/hosp/hospital/${page}/${limit}`,{
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