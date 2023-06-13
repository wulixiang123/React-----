
/**
 * 地区对象类型
 */
export interface IDistrictItem {
    id: number;
    name: string;
    value: string;
    dictCode: null,
    hasChildren: boolean;
}
/**
 * 地区对象列表类型
 */
export type IDistrictList = IDistrictItem[]
/**
 * 医院列表分页数据参数类型
 */
export interface IHospitalListParams {
    page: number;
    limit: number;
    hoscode?: string;
    hosname?: string;
    hostype?: string;
    provinceCode?: string;
    cityCode?: string;
    districtCode?: string;
    status?: number;
}
/**
 * 预约规则类型
 */
export interface IBookingRule {
    cycle: number;
    releaseTime: string;
    stopTime: string;
    quitDay: number;
    quitTime: string;
    rule: string[]
}
/**
 * 医院列表每一项的类型
 */
export interface IHospitalItem {
    id: string;
    createTime: string;
    param: {
        hostypeString: string;
        fullAddress: string;
    },
    hoscode: string;
    hosname: string;
    hostype: string;
    provinceCode: string;
    cityCode: string;
    districtCode: string;
    address: string;
    logoData: string;
    intro: null,
    route: string;
    status: number;
    bookingRule: IBookingRule
}
/**
 * 医院列表类型
 */
export type IHospitalList = IHospitalItem[]

/**
 * 医院列表分页数据返回值类型
 */
export interface IHospitalListResponse {
    content: IHospitalList;
    totalElements: number;
}

// 医院详情返回值类型
export interface IHospitalDetailResponse {
    "bookingRule": IBookingRule,
    "hospital": IHospitalItem
}

// 科室每一项类型
export interface IDepartmentItem{
    depcode:string; // 科室编号
    depname:string; // 科室名
    children:IDepartmentList | null;
    disabled?:boolean;
}

// 科室列表类型
export type IDepartmentList = IDepartmentItem[]

// 排班日期每一项的类型
export interface IScheduleItem{
    "workDate": string;// 当前年月日日期
    "workDateMd": null,
    "dayOfWeek": string; // 周几
    "docCount": number;
    "reservedNumber": number;// 可预约挂号上限人数
    "availableNumber": number;// 剩余挂号人数
    "status": null
}


// 排班日期列表类型
export type IScheduleList = IScheduleItem[]

// 排班日期响应结果类型
export interface IScheduleResponse{
    total: number;
    bookingScheduleList: IScheduleList;
    baseMap: {
        hosname: string;
    }
}

// 排班医生每一项类型
export interface IDoctorItem{
    "id": string;
    "title": string;
    "docname": string;
    "skill": string;
    "workDate": string;
    "workTime": number;
    "reservedNumber": number;
    "availableNumber": number;
    "amount": number;
    "status": number;
}

// 排班医生数组类型
export type IDoctorList = IDoctorItem[];