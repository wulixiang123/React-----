import { request } from "@/utils/http";

const api_name = "/admin/cmn/dict";

export const findByDictCode = (dictCode: string): any => {
  return request({
    url: `${api_name}/findByDictCode/${dictCode}`,
    method: "get",
  });
};

export const findByParentId = (parentId: number): any => {
  return request({
    url: `${api_name}/findByParentId/${parentId}`,
    method: "get",
  });
};

export const exportData = () => {
  return request({
    url: `${api_name}/exportData`,
    method: "get",
  });
};
