export interface IUserItem{
    login:string;
    id:number;
    avatar_url: string;
    url: string;
    html_url: string;
}

export type IUserList = IUserItem[]

export interface IResponse{
    total_count:number;
    items:IUserList
}