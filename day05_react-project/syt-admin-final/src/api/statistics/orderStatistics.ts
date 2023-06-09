import { request } from "@/utils/http";

const api_name = "/admin/order/orderInfo";

export const getCountMap = (searchObj: any): any => {
	return request({
		url: `${api_name}/getCountMap`,
		method: "get",
		params: searchObj,
	});
};
