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
 * 添加医院设置请求参数类型
 */
 export interface IAddHospitalSetParams{
    hosname: string;
    hoscode: string;
    apiUrl: string;
    contactsName: string;
    contactsPhone: string;
    id?:string | number;
}
/**
 * 医院设置对象类型
 */
export interface IHospitalSetItem extends IAddHospitalSetParams{
    id: number;
    createTime: string;
    signKey: string;
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




