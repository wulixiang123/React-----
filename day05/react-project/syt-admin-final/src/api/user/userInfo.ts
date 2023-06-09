import { request } from "@/utils/http";

const api_name = "/admin/user";

export const getPageList = (page: number, limit: number, searchObj: any): any => {
  return request({
    url: `${api_name}/${page}/${limit}`,
    method: "get",
    params: searchObj,
  });
};

export const lock = (id: number, status: number) => {
  return request({
    url: `${api_name}/lock/${id}/${status}`,
    method: "get",
  });
};

export const show = (id: number): any => {
  return request({
    url: `${api_name}/show/${id}`,
    method: "get",
  });
};

export const approval = (id: number, authStatus: number) => {
  return request({
    url: `${api_name}/approval/${id}/${authStatus}`,
    method: "get",
  });
};
