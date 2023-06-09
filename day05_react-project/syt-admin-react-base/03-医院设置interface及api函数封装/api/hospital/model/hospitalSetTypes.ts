/**
 * 医院设置参数类型
 */
export interface IHospitalSetParams {
    page: number;
    limit: number;
    hosname?: string;
    hoscode?: string;
}
/**
 * 医院设置对象类型
 */
export interface IHospitalSetItem {
    id: number;
    createTime: string;
    hosname: string;
    hoscode: string;
    apiUrl: string;
    signKey: string;
    contactsName: string;
    contactsPhone: string;
    status: number;
}
/**
 * 医院设置列表类型
 */
export type IHospitalSetList = IHospitalSetItem[]

/**
 * 医院设置分页响应数据类型
 */
export interface IHospitalSetResponse {
    records:IHospitalSetList;
    total:number;
}