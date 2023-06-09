// 搜索参数类型
export interface SearchParams {
  hosname?: string;
  hoscode?: string;
}

// 获取医院设置列表参数类型
export interface GetHospitalSetListParams extends SearchParams {
  page: number;
  limit: number;
}

// 获取医院设置列表
/*
  只需要定义data中数据结构
  定义数据类型：可以只定义需要使用的数据，其他数据可以不定义
  {
    "records": [
      {
        "id": 119,
        "createTime": "2022-06-06 12:24:22",
        "updateTime": "2022-06-06 12:24:22",
        "isDeleted": 0,
        "param": {},
        "hosname": "整容医院",
        "hoscode": "6666",
        "apiUrl": null,
        "signKey": "d5a01be2fc7a3bb0b0c799d907c29bbe",
        "contactsName": "周杰伦",
        "contactsPhone": "15966057118",
        "status": 1
      }
    ],
    "total": 7,
    "size": 1,
    "current": 1,
    "orders": [],
    "hitCount": false,
    "searchCount": true,
    "pages": 7
  }
*/

export interface HospitalSetItem {
  id: number;
  // createTime: "2022-06-06 12:24:22";
  // updateTime: "2022-06-06 12:24:22";
  // isDeleted: 0;
  // param: {};
  hosname: string; // 医院名称
  hoscode: string; // 医院编号
  apiUrl: string; // api基础路径
  signKey: string; // 签名
  contactsName: string; // 联系人姓名
  contactsPhone: string; // 联系人电话
  // status: 1;
}

export type HospitalSetList = HospitalSetItem[];

export interface GetHospitalSetListResponse {
  // 可以只定义需要使用的数据
  records: HospitalSetList; // 列表数据
  total: number; // 总数
  size: number;
  current: number;
  // "orders": [],
  // "hitCount": boolean,
  // "searchCount": boolean,
  // "pages": number
}

// 添加医院参数类型
export interface AddHospitalParams {
  apiUrl: string; // api基础路径
  contactsName: string; // 联系人姓名
  contactsPhone: string; // 联系人电话
  hoscode: string; // 医院编号
  hosname: string; // 医院名称
  // "id": 0, // id一定由服务器生成
}

// 修改医院参数类型
export interface UpdateHospitalParams extends AddHospitalParams {
  id: number;
}
