export type Status = 0 | 1;

export interface SearchHospitalListParams {
  hoscode?: string; // 医院编号
  hosname?: string; // 医院名称
  hostype?: string; // 医院等级
  provinceCode?: string; // 省code
  cityCode?: string; // 市code
  districtCode?: string; // 区code
  status?: Status; // 状态 0：未上线 1：已上线
}

// 获取医院列表参数类型
export interface GetHospitalListParams extends SearchHospitalListParams {
  page: number;
  limit: number;
}

/*
  {
    "content": [ // 整个医院列表
      {
        "id": "622574cc36a9ba1be763dad8",
        "createTime": "2022-03-07 10:58:20",
        "updateTime": "2022-06-08 15:17:53",
        "isDeleted": 0,
        "param": {
          "hostypeString": "三级甲等",
          "fullAddress": "北京市市辖区西城区大望路"
        },
        "hoscode": "1000_0",
        "hosname": "北京协和医院",
        "hostype": "1",
        "provinceCode": "110000",
        "cityCode": "110100",
        "districtCode": "110102",
        "address": "大望路",
        "logoData": "xxx"
        "intro": "北京协和医院是集医疗、教学、科研于一体的大型三级甲等综合医院，是国家卫生计生委指定的全国疑难重症诊治指导中心，也是最早承担高干保健和外宾医疗任务的医院之一，以学科齐全、技术力量雄厚、特色专科突出、多学科综合优势强大享誉海内外。在2010、2011、2012、2013、2014年复旦大学医院管理研究所公布的“中国最佳医院排行榜”中连续五年名列榜首。\n\n医院建成于1921年，由洛克菲勒基金会创办。建院之初，就志在“建成亚洲最好的医学中心”。90余年来，医院形成了“严谨、求精、勤奋、奉献”的协和精神和兼容并蓄的特色文化风格，创立了“三基”、“三严”的现代医学教育理念，形成了以“教授、病案、图书馆”著称的协和“三宝”，培养造就了张孝骞、林巧稚等一代医学大师和多位中国现代医学的领军人物，并向全国输送了大批的医学管理人才，创建了当今知名的10余家大型综合及专科医院。2011年在总结90年发展经验的基础上，创新性提出了“待病人如亲人，提高病人满意度；待同事如家人，提高员工幸福感”新办院理念。\n\n目前，医院共有2个院区、总建筑面积53万平方米，在职职工4000余名、两院院士5人、临床和医技科室53个、国家级重点学科20个、国家临床重点专科29个、博士点16个、硕士点29个、国家级继续医学教育基地6个、二级学科住院医师培养基地18个、三级学科专科医师培养基地15个。开放住院床位2000余张，单日最高门诊量约1.5万人次、年出院病人约8万余人次。被评为“全国文明单位”、“全国创先争优先进基层党组织”、“全国卫生系统先进集体”、“首都卫生系统文明单位”、“最受欢迎三甲医院”，荣获全国五一劳动奖章。同时，医院还承担着支援老少边穷地区、国家重要活动和突发事件主力医疗队的重任，在2008年北京奥运工作中荣获“特别贡献奖”。\n\n90多年来，协和人以执着的医志、高尚的医德、精湛的医术和严谨的学风书写了辉煌的历史，今天的协和人正为打造“国际知名、国内一流”医院的目标而继续努力。",
        "route": "东院区乘车路线：106、108、110、111、116、684、685路到东单路口北；41、104快、814路到东单路口南；1、52、802路到东单路口西；20、25、37、39路到东单路口东；103、104、420、803路到新东安市场；地铁1、5号线到东单。\n西院区乘车路线：68路到辟才胡同东口；更多乘车路线详见须知。",
        "status": 1,
        "bookingRule": {
          "cycle": 10,
          "releaseTime": "08:30",
          "stopTime": "11:30",
          "quitDay": -1,
          "quitTime": "15:30",
          "rule": [
            "西院区预约号取号地点：西院区门诊楼一层大厅挂号窗口取号",
            "东院区预约号取号地点：东院区老门诊楼一层大厅挂号窗口或新门诊楼各楼层挂号/收费窗口取号"
          ]
        }
      }
    ],
    "totalElements": 20, // 总数
  }

*/
export interface HospitalItem {
  id: string;
  createTime: string; // 创建时间
  param: {
    hostypeString: string; // 医院等级
    fullAddress: string; // 详细地址
  };
  hosname: string; // 医院名称
  logoData: string; // 医院logo
  status: Status; // 状态
}

export type HospitalListType = HospitalItem[];

export interface GetHospitalListResponse {
  content: HospitalListType;
  totalElements: number;
}

// 省市区三级分类数据结构
export interface CityItem {
  id: number;
  // "updateTime": "2020-06-23 15:52:57",
  // "isDeleted": 0,
  // "param": {},
  // "parentId": 86,
  name: string;
  value: string;
  createTime: string; // 获取dictList，展示数据需要使用
  dictCode: string; // 获取dictList，展示数据需要使用
  children: CityList; // 获取子菜单，展示数据需要使用
  hasChildren: boolean;
}

export type CityList = CityItem[];

/*
  {
     "bookingRule": {
      "cycle": 10,
      "releaseTime": "08:30",
      "stopTime": "11:30",
      "quitDay": -1,
      "quitTime": "15:30",
      "rule": [
        "西院区预约号取号地点：西院区门诊楼一层大厅挂号窗口取号",
        "东院区预约号取号地点：东院区老门诊楼一层大厅挂号窗口或新门诊楼各楼层挂号/收费窗口取号"
      ]
    },
    "hospital": {
      // SearchHospitalListParams
      // "hoscode": "1000_0",
      // "hosname": "北京协和医院",
      // "hostype": "1",
      // "provinceCode": "110000",
      // "cityCode": "110100",
      // "districtCode": "110102",
      // "status": 1,

      // HospitalItem
      // "id": "622574cc36a9ba1be763dad8",
      // "createTime": "2022-03-07 10:58:20",
      // "logoData": "xxx"
      // "param": {
      //   "hostypeString": "三级甲等",
      //   "fullAddress": "北京市市辖区西城区大望路"
      // },

      // 需要定义
      "route": "东院区乘车路线：106、108、110、111、116、684、685路到东单路口北；41、104快、814路到东单路口南；1、52、802路到东单路口西；20、25、37、39路到东单路口东；103、104、420、803路到新东安市场；地铁1、5号线到东单。\n西院区乘车路线：68路到辟才胡同东口；更多乘车路线详见须知。",
      "intro": "xxx",
      "bookingRule": null  // 不需要
      "updateTime": "2022-06-10 11:11:00", // 不需要
      "isDeleted": 0, // 不需要
      "address": "大望路", // 不需要
    }
  }
*/

// 单个医院类型
// SearchHospitalListParams 里面所有参数都是可选参数
// Required<SearchHospitalListParams> 将 SearchHospitalListParams 中所有参数变成必选参数
// Exclude / Omit / ...
// export interface HospitalDetailItem extends Required<SearchHospitalListParams>, HospitalItem {
// Omit<HospitalItem, "id" | "createTime"> 使用HospitalItem类型，其中排除id\createTime属性，其他属性都要（排除）
// Pick<HospitalItem, 'logoData' | 'param'> 使用HospitalItem类型，只使用logoData/param，其他属性不要（挑选）
export interface HospitalDetailItem extends Required<SearchHospitalListParams>, Omit<HospitalItem, "id" | "createTime"> {
  route: string;
  intro: string;
}

export interface HospitalDetail {
  bookingRule: {
    cycle: number; // 预约周期
    releaseTime: string; // 放号时间
    stopTime: string; // 停挂时间
    // quitDay: number;
    quitTime: string; // 退号时间
    rule: string[]; // 预约规则
  };
  hospital: HospitalDetailItem;
}

/*
  [
    {
      "depcode": "a4e171f4cf9b6816acdfb9ae62c414d7",
      "depname": "专科",
      "children": [
        {
          "depcode": "200040878",
          "depname": "多发性硬化专科门诊",
          "children": null
        },
      ]
    }
  ]
*/

// 医院科室类型
export interface DepartmentItem {
  depcode: string;
  depname: string;
  children: DepartmentList;
}

export type DepartmentList = DepartmentItem[];

// 获取医院排班日期列表参数类型
export interface GetScheduleRuleListParams {
  page: number;
  limit: number;
  hoscode: string;
  depcode: string;
}

/*
  {
    "total": 37,
    "bookingScheduleList":[
      {
        "workDate": "2022-04-24",
        "workDateMd": null,
        "dayOfWeek": "周日",
        "docCount": 3,
        "reservedNumber": 100,
        "availableNumber": 38,
        "status": null
      }
    ],
    "baseMap": {
      "hosname": "北京协和医院"
    }
  }
*/
// 获取医院排班日期列表返回值类型
export interface GetScheduleRuleListResponse {
  total: number;
  bookingScheduleList: ScheduleRuleList;
  baseMap: {
    hosname: string;
  };
}

export interface ScheduleRuleItem {
  workDate: string; // 日期
  // "workDateMd": null,
  dayOfWeek: string; // 周几
  // "docCount": 3,
  reservedNumber: number; // 放号数量
  availableNumber: number; // 已预约数
  // "status": null
}

export type ScheduleRuleList = ScheduleRuleItem[];

// 获取医院列表参数类型
export interface GetDoctorListParams extends Pick<GetScheduleRuleListParams, "hoscode" | "depcode"> {
  workDate: string;
}

/*
  [
    {
      "id": "6225753536a9ba1be763dc7a",
      "createTime": "2022-03-07 11:00:05",
      "updateTime": "2022-03-07 11:00:05",
      "isDeleted": 0,
      "param": {
        "dayOfWeek": "周四",
        "depname": "多发性硬化专科门诊",
        "hosname": "北京协和医院"
      },
      "hoscode": "1000_0",
      "depcode": "200040878",
      "title": "医师",
      "docname": "",
      "skill": "内分泌科常见病。",
      "workDate": "2022-04-28",
      "workTime": 0,
      "reservedNumber": 33,
      "availableNumber": 22,
      "amount": 100,
      "status": 1,
      "hosScheduleId": "112"
    },
  ]
*/

// 获取医院列表返回值类型
export interface DoctorItem {
  id: string;
  reservedNumber: number;
  availableNumber: number;
  amount: number;
  skill: string;
  workDate: string;
  title: string;
  // createTime: "2022-03-07 11:00:05";
  // updateTime: "2022-03-07 11:00:05";
  // isDeleted: 0;
  // param: {
  //   dayOfWeek: "周四";
  //   depname: "多发性硬化专科门诊";
  //   hosname: "北京协和医院";
  // };
  // hoscode: "1000_0";
  // depcode: "200040878";
  // docname: "";
  // workTime: 0;
  // status: 1;
  // hosScheduleId: "112";
}
export type DoctorList = DoctorItem[];
