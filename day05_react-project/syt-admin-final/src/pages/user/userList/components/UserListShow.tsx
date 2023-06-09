import React, { useState, useEffect } from "react";
import { Card, Descriptions, Button, Table } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { show } from "@/api/user/userInfo";

function UserListShow() {
	const params = useParams();
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState<any>({
		param: {},
	});
	const [patientList, setPatientList] = useState<any>([]);

	useEffect(() => {
		const getUserInfo = async () => {
			const data = await show(+(params.id as string));
			setUserInfo(data.userInfo);
			setPatientList(data.patientList);
		};

		getUserInfo();
	}, []);

	const columns = [
		{
			title: "序号",
			key: "index",
			render: (_a: any, _b: any, index: number) => {
				return index + 1;
			},
		},
		{
			title: "姓名",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "证件类型",
			key: "certificatesTypeString",
			render: (row: any) => row.param.certificatesTypeString,
		},

		{
			title: "证件编号",
			key: "certificatesNo",
			dataIndex: "certificatesNo",
		},
		{
			title: "性别",
			dataIndex: "sex",
			key: "sex",
			render: (sex: number) => (sex ? "男" : "女"),
		},
		{
			title: "出生年月",
			key: "birthdate",
			dataIndex: "birthdate",
		},
		{
			title: "手机",
			key: "phone",
			dataIndex: "phone",
		},
		{
			title: "是否结婚",
			key: "isMarry",
			dataIndex: "isMarry",
			render: (isMarry: number) => (isMarry ? "已婚" : "未婚"),
		},
		{
			title: "地址",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "注册时间",
			dataIndex: "createTime",
			key: "createTime",
		},
	];

	return (
		<Card>
			<Descriptions title="用户信息" bordered>
				<Descriptions.Item label="手机号" span={2}>
					{userInfo.phone}
				</Descriptions.Item>
				<Descriptions.Item label="用户姓名" span={2}>
					{userInfo.name}
				</Descriptions.Item>
				<Descriptions.Item label="状态" span={2}>
					{userInfo.param.statusString}
				</Descriptions.Item>
				<Descriptions.Item label="注册时间" span={2}>
					{userInfo.createTime}
				</Descriptions.Item>
			</Descriptions>

			<Descriptions title="认证信息" bordered style={{ marginTop: 20 }}>
				<Descriptions.Item label="姓名" span={2}>
					{userInfo.name}
				</Descriptions.Item>
				<Descriptions.Item label="证件类型" span={2}>
					{userInfo.param.certificatesTypeString}
				</Descriptions.Item>
				<Descriptions.Item label="证件号" span={2}>
					{userInfo.certificatesNo}
				</Descriptions.Item>
				<Descriptions.Item label="证件图片" span={2}>
					{userInfo.certificatesUrl}
				</Descriptions.Item>
			</Descriptions>

			<div style={{ margin: "20px 0" }}>
				<div className="ant-descriptions-title">就诊人信息</div>
				<div className="ant-descriptions-view">
					<Table
						style={{ marginTop: 20 }}
						columns={columns}
						dataSource={patientList}
						bordered
						rowKey="id"
						pagination={false}
					/>
				</div>
			</div>

			<Button onClick={() => navigate(-1)}>返回</Button>
		</Card>
	);
}

export default UserListShow;
