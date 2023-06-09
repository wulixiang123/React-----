import React, { useEffect, useState } from "react";
import { Card, Descriptions, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getById } from "@/api/order/orderInfo";

function OrderListShow() {
	const params = useParams();
	const navigate = useNavigate();

	const [orderInfo, setOrderInfo] = useState<any>({ param: {} });
	const [patientInfo, setPatientInfo] = useState<any>({ param: {} });

	useEffect(() => {
		const getInfo = async () => {
			const data = await getById(+(params.id as string));
			setOrderInfo(data.orderInfo);
			setPatientInfo(data.patient);
		};
		getInfo();
	}, []);

	return (
		<Card>
			<Descriptions title="订单信息" bordered>
				<Descriptions.Item label="订单交易号" span={2}>
					{orderInfo.outTradeNo}
				</Descriptions.Item>
				<Descriptions.Item label="医院名称" span={2}>
					{orderInfo.hosname}
				</Descriptions.Item>
				<Descriptions.Item label="科室名称" span={2}>
					{orderInfo.depname}
				</Descriptions.Item>
				<Descriptions.Item label="医生职称" span={2}>
					{orderInfo.title}
				</Descriptions.Item>
				<Descriptions.Item label="安排日期" span={2}>
					{orderInfo.reserveDate}
				</Descriptions.Item>
				<Descriptions.Item label="预约号序" span={2}>
					{orderInfo.number}
				</Descriptions.Item>
				<Descriptions.Item label="医事服务费" span={2}>
					{orderInfo.amount}
				</Descriptions.Item>
				<Descriptions.Item label="建议取号时间" span={2}>
					{orderInfo.fetchTime}
				</Descriptions.Item>
				<Descriptions.Item label="取号地点" span={2}>
					{orderInfo.fetchAddress}
				</Descriptions.Item>
				<Descriptions.Item label="退号时间" span={2}>
					{orderInfo.quitTime}
				</Descriptions.Item>
				<Descriptions.Item label="订单状态" span={2}>
					{orderInfo.param.orderStatusString}
				</Descriptions.Item>
				<Descriptions.Item label="预约时间" span={2}>
					{orderInfo.createTime}
				</Descriptions.Item>
			</Descriptions>

			<Descriptions title="就诊人信息" bordered style={{ margin: "20px 0" }}>
				<Descriptions.Item label="姓名" span={2}>
					{patientInfo.name}
				</Descriptions.Item>
				<Descriptions.Item label="证件类型" span={2}>
					{patientInfo.param.certificatesTypeString}
				</Descriptions.Item>
				<Descriptions.Item label="证件编号" span={2}>
					{patientInfo.certificatesNo}
				</Descriptions.Item>
				<Descriptions.Item label="性别" span={2}>
					{patientInfo.sex ? "男" : "女"}
				</Descriptions.Item>
				<Descriptions.Item label="出生年月" span={2}>
					{patientInfo.birthdate}
				</Descriptions.Item>
				<Descriptions.Item label="手机" span={2}>
					{patientInfo.phone}
				</Descriptions.Item>
				<Descriptions.Item label="是否结婚" span={2}>
					{patientInfo.isMarry ? "已婚" : "未婚"}
				</Descriptions.Item>
				<Descriptions.Item label="地址" span={2}>
					{patientInfo.param.fullAddress}
				</Descriptions.Item>
				<Descriptions.Item label="联系人姓名" span={2}>
					{patientInfo.contactsName}
				</Descriptions.Item>
				<Descriptions.Item label="联系人证件类型" span={2}>
					{patientInfo.param.contactsCertificatesTypeString}
				</Descriptions.Item>
				<Descriptions.Item label="联系人证件号" span={2}>
					{patientInfo.contactsCertificatesNo}
				</Descriptions.Item>
				<Descriptions.Item label="联系人手机" span={2}>
					{patientInfo.contactsPhone}
				</Descriptions.Item>
			</Descriptions>

			<Button onClick={() => navigate("/order/orderInfo/list")}>返回</Button>
		</Card>
	);
}

export default OrderListShow;
