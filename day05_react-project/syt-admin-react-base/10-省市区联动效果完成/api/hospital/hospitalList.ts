import {request} from '@utils/http'
import {IDistrictList} from './model/hospitalListType'

export const getDistrictList = (id:string | number) =>{
    return request.get<any,IDistrictList>('/admin/cmn/dict/findByParentId/' + id)
}