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