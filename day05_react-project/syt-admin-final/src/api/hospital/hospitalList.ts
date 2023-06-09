// 二次封装的axios函数。（近似看做就是axios）
import { request } from "@/utils/http";
import {
  GetHospitalListParams,
  GetHospitalListResponse,
  CityList,
  HospitalDetail,
  DepartmentList,
  GetScheduleRuleListParams,
  GetScheduleRuleListResponse,
  GetDoctorListParams,
  DoctorList,
  Status,
} from "./model/hospitalListTypes";
// 获取医院列表
/*
  // ...args 剩下所有参数
  function fn(x, y, ...args) {}

  // { page, limit, ...params } 代表解构，解构函数的第一个参数
  // ...params代表除了page\limit以外剩下的属性
  function fn({ page, limit, ...params }) {}
*/
export const reqGetHospitalList = ({ page, limit, ...params }: GetHospitalListParams) => {
  return request.get<any, GetHospitalListResponse>(`/admin/hosp/hospital/${page}/${limit}`, {
    params,
  });
};

// 获取省列表数据
// export const reqGetProvinceList = () => {
//   return request.get<any, any>(`/admin/cmn/dict/findByDictCode/province`);
// };

// 获取省/市/区列表数据
export const reqGetCityList = (parentId: number) => {
  return request.get<any, CityList>(`/admin/cmn/dict/findByParentId/${parentId}`);
};

// 获取医院详情数据
export const reqGetHospitalById = (id: string) => {
  return request.get<any, HospitalDetail>(`/admin/hosp/hospital/show/${id}`);
};

// 获取医院科室列表
export const reqGetDepartmentList = (hoscode: string) => {
  return request.get<any, DepartmentList>(`/admin/hosp/department/${hoscode}`);
};

// 获取排班日期列表
export const reqGetScheduleRuleList = ({ page, limit, hoscode, depcode }: GetScheduleRuleListParams) => {
  return request.get<any, GetScheduleRuleListResponse>(`/admin/hosp/schedule/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`);
};

// 获取医生列表
export const reqGetDoctorList = ({ hoscode, depcode, workDate }: GetDoctorListParams) => {
  return request.get<any, DoctorList>(`/admin/hosp/schedule/findScheduleList/${hoscode}/${depcode}/${workDate}`);
};

// 更新医院上线/下线的状态
export const reqUpdateHospitalStatus = (id: string, status: Status) => {
  return request.get<any, null>(`/admin/hosp/hospital/updateStatus/${id}/${status}`);
};
