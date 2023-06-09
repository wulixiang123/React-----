
export interface IHospitalSetParams {
    page: number
    limit: number
    hosname?: string
    hoscode?: string
}

export interface IHospitalSetItem {
    "id": number,
    "createTime": string,
    "hosname": string,
    "apiUrl": string,
    "signKey": string,
    "contactsName": string,
    "contactsPhone": string,
    "status": number
}

export type IHospitalSetList = IHospitalSetItem[]

export interface IHospitalSetResponse {
    records:IHospitalSetList;
    total:number;
}