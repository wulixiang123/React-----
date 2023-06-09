/*
   "records": [
      {
        "id": 46,
        "createTime": "2022-04-23 11:12:44",
        "updateTime": "2022-04-23 11:12:44",
        "isDeleted": 0,
        "param": {
          "orderStatusString": "已支付"
        },
        "userId": 83,
        "outTradeNo": "165068356476431",
        "hoscode": "1000_0",
        "hosname": "北京协和医院",
        "depcode": "200040878",
        "depname": "多发性硬化专科门诊",
        "scheduleId": null,
        "title": "副主任医师",
        "reserveDate": "2022-04-23",
        "reserveTime": 0,
        "patientId": 36,
        "patientName": "高嘉玲",
        "patientPhone": "15616155765",
        "hosRecordId": "49",
        "number": 36,
        "fetchTime": "2022-04-2309:00前",
        "fetchAddress": "一层114窗口",
        "amount": 100,
        "quitTime": "2022-04-22 15:30",
        "orderStatus": 1
      }
    ],
    "total": 46,

*/
export interface OrderItem {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    orderStatusString: string;
  };
  userId: number;
  outTradeNo: string;
  hoscode: string;
  hosname: string;
  depcode: string;
  depname: string;
  // scheduleId: null;
  title: string;
  reserveDate: string;
  reserveTime: number;
  patientId: number;
  patientName: string;
  patientPhone: string;
  hosRecordId: string;
  number: number;
  fetchTime: string;
  fetchAddress: string;
  amount: number;
  quitTime: string;
  orderStatus: number;
}

export type OrderList = OrderItem[];

export interface GetOrderListResponse {
  records: OrderList;
  total: number;
}
