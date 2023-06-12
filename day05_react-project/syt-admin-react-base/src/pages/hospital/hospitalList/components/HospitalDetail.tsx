import { getHospitalDetail } from '@/api/hospital/hospitalList';
import { IBookingRule, IHospitalItem } from '@/api/hospital/model/hospitalListTypes';
import { Button, Card, Descriptions, Image } from 'antd'
import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'

export default function HospitalDetail() {
    let [hospital, setHospital] = useState<IHospitalItem>()
    let [bookingRule, setBookingRule] = useState<IBookingRule>()
    // path参数id获取
    let {id} = useParams();
    const _getHospitalDetail = async ()=>{
        let {hospital,bookingRule} = await getHospitalDetail(id as string);
        setHospital(hospital);
        setBookingRule(bookingRule)
    }
    useEffect(()=>{
        id && _getHospitalDetail();
    },[])
    return (
        <Card>
            <Descriptions labelStyle={{width:120}} title="基本信息" bordered>
                <Descriptions.Item label="医院名称" span={1.5}>{hospital?.hosname}</Descriptions.Item>
                <Descriptions.Item label="医院logo" span={1.5}>
                    {hospital?.logoData && <Image width={100} src={'data:image/png;base64,' + hospital?.logoData}/>}
                </Descriptions.Item>
                <Descriptions.Item label="医院编码"  span={1.5}>{hospital?.hoscode}</Descriptions.Item>
                <Descriptions.Item label="医院地址"  span={1.5}>{hospital?.createTime}</Descriptions.Item>
                <Descriptions.Item label="坐车路线" span={3}>
                    {hospital?.route}
                </Descriptions.Item>
                <Descriptions.Item label="医院简介" span={3}>
                    {hospital?.intro}
                </Descriptions.Item>
            </Descriptions>

            <Descriptions className='mt mb' title="预约规则信息" bordered>
                <Descriptions.Item label="预约周期"  span={1.5}>{bookingRule?.cycle}</Descriptions.Item>
                <Descriptions.Item label="放号时间"  span={1.5}>{bookingRule?.releaseTime}</Descriptions.Item>
                <Descriptions.Item label="停挂时间"  span={1.5}>{bookingRule?.stopTime}</Descriptions.Item>
                <Descriptions.Item label="退号时间"  span={1.5}>{bookingRule?.quitTime}</Descriptions.Item>
                <Descriptions.Item label="预约规则" span={3}>
                    <ul>
                        {bookingRule?.rule.map((item,index)=>(
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </Descriptions.Item>
            </Descriptions>
            <Button >返回</Button>
        </Card>
    )
}
