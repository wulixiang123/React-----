// 二次封装的axios函数。（近似看做就是axios）
import { request } from "@/utils/http";
import { Key } from "react";

// 先定义接口返回值数据的类型
// 引入数据类型
import type {
  GetHospitalSetListParams,
  GetHospitalSetListResponse,
  AddHospitalParams,
  HospitalSetItem,
  UpdateHospitalParams,
} from "./model/hospitalSetTypes";

// 获取医院设置列表
// 需要定义的类型：1. 请求参数类型 2. 返回值类型
export const reqGetHospitalSetList = ({ page, limit, hosname, hoscode }: GetHospitalSetListParams) => {
  // <any, string>的第一个类型为any即可，实际不会用上
  // 第二个类型是返回值数据中data的类型，根据接口文档填写
  return request.get<any, GetHospitalSetListResponse>(`/admin/hosp/hospitalSet/${page}/${limit}`, {
    params: {
      hosname,
      hoscode,
    },
  });
};

// 添加医院
export const reqAddHospital = (data: AddHospitalParams) => {
  // data就是post请求的请求体参数
  return request.post<any, null>(`/admin/hosp/hospitalSet/save`, data);
};

// 修改医院
export const reqUpdateHospital = (data: UpdateHospitalParams) => {
  // data就是put请求的请求体参数
  return request.put<any, null>(`/admin/hosp/hospitalSet/update`, data);
};

// 根据id获取医院数据
export const reqGetHospitalById = (id: number) => {
  return request.get<any, HospitalSetItem>(`/admin/hosp/hospitalSet/get/${id}`);
};

// 删除医院
export const reqRemoveHospital = (id: number) => {
  return request.delete<any, null>(`/admin/hosp/hospitalSet/remove/${id}`);
};

// 批量删除医院
export const reqBatchRemoveHospitals = (idList: Key[]) => {
  // get/delete请求，要携带body参数，要写在data中
  return request.delete<any, null>(`/admin/hosp/hospitalSet/batchRemove`, {
    data: idList,
  });
};
