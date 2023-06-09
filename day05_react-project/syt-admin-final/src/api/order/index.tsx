import { request } from "@/utils/http";
import type { GetOrderListResponse } from "./model/orderTypes";

// 获取订单数据
export const reqGetOrderList = (page: number, limit: number) => {
  return request.get<any, GetOrderListResponse>(`/admin/order/orderInfo/${page}/${limit}`);
};
