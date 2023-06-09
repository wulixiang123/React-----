import { Card, Descriptions, Button } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { reqGetHospitalById } from "@api/hospital/hospitalList";
import { HospitalDetail } from "@api/hospital/model/hospitalListTypes";

export default function ShowHospital() {
  const params = useParams();
  const id = params.id as string;

  const [hospital, setHospital] = useState<HospitalDetail>({
    bookingRule: {
      cycle: 0,
      releaseTime: "",
      stopTime: "",
      quitTime: "",
      rule: [],
    },
    hospital: {
      hoscode: "",
      hosname: "",
      hostype: "",
      provinceCode: "",
      cityCode: "",
      districtCode: "",
      status: 1,
      // id: "",
      // createTime: "",
      logoData: "",
      param: {
        hostypeString: "",
        fullAddress: "",
      },
      // 需要定义
      route: "",
      intro: "",
    },
  });

  const getHospitalById = async () => {
    const hospital = await reqGetHospitalById(id);
    setHospital(hospital);
  };

  useEffect(() => {
    getHospitalById();
  }, []);

  const navigate = useNavigate();
  const goBack = () => {
    navigate("/syt/hospital/hospitalList");
  };

  return (
    <Card>
      {/* 
        column 一行的 DescriptionItems 数量
      */}
      <Descriptions title="基本信息" bordered column={4}>
        {/* 
          span 包含列的数量
        */}
        <Descriptions.Item label="医院名称" span={2} labelStyle={{width: 200}}>
          {hospital.hospital.hosname}
        </Descriptions.Item>
        <Descriptions.Item label="医院logo" span={2}>
          <img style={{ width: 100, height: 100 }} src={`data:image/jpeg;base64,${hospital.hospital.logoData}`} alt={hospital.hospital.hosname} />
        </Descriptions.Item>
        <Descriptions.Item label="医院编码" span={2}>
          {hospital.hospital.hoscode}
        </Descriptions.Item>
        <Descriptions.Item label="医院地址" span={2}>
          {hospital.hospital.param.fullAddress}
        </Descriptions.Item>
        <Descriptions.Item label="坐车路线" span={4} >
          {hospital.hospital.route}
        </Descriptions.Item>
        <Descriptions.Item label="医院简介" span={4}>
          {hospital.hospital.intro}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title="预约规则信息" bordered column={4} className="mt">
        {/* 
          span 包含列的数量
        */}
        <Descriptions.Item label="预约周期" span={2}>
          {hospital.bookingRule.cycle}
        </Descriptions.Item>
        <Descriptions.Item label="放号时间" span={2}>
          {hospital.bookingRule.releaseTime}
        </Descriptions.Item>
        <Descriptions.Item label="停挂时间" span={2}>
          {hospital.bookingRule.stopTime}
        </Descriptions.Item>
        <Descriptions.Item label="退号时间" span={2}>
          {hospital.bookingRule.quitTime}
        </Descriptions.Item>
        <Descriptions.Item label="预约规则" span={4}>
          {hospital.bookingRule.rule.map((rule, index) => {
            // 不会CRUD，key可以使用index
            return <div key={index}>{`${index + 1}. ${rule}`}</div>;
          })}
        </Descriptions.Item>
      </Descriptions>

      <Button className="mt" onClick={goBack}>
        返回
      </Button>
    </Card>
  );
}
