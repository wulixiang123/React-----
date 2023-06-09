import { request } from "@/utils/http";

const api_name = "/admin/order/orderInfo";

export const getPageList = (page: number, limit: number, searchObj: any): any => {
  return request({
    url: `${api_name}/${page}/${limit}`,
    method: "get",
    params: searchObj,
  });
};

export const getStatusList = (): any => {
  return request({
    url: `${api_name}/getStatusList`,
    method: "get",
  });
};

export const getById = (id: number): any => {
  return request({
    url: `${api_name}/show/${id}`,
    method: "get",
  });
};
