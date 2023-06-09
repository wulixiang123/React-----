import { useEffect, useState } from "react";
import { Card, Form, Input, Button, Table, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/lib/table";
import { useNavigate } from "react-router-dom";

import { reqGetHospitalList, reqGetCityList, reqUpdateHospitalStatus } from "@api/hospital/hospitalList";
import { HospitalListType, HospitalItem, CityList, SearchHospitalListParams, Status } from "@api/hospital/model/hospitalListTypes";

import "./index.less";

const { Option } = Select;

export default function HospitalList() {
  // 医院列表
  const [hospitalList, setHospitalList] = useState<HospitalListType>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // 获取医院列表
  const getHospitalList = async (current: number, pageSize: number, searchParams: SearchHospitalListParams) => {
    setLoading(true);
    const res = await reqGetHospitalList({ page: current, limit: pageSize, ...searchParams });
    setHospitalList(res.content); // 更新医院列表数据
    setCurrent(current); // 更新当前页码
    setPageSize(pageSize); // 更新每页条数
    setTotal(res.totalElements); // 更新总数
    setLoading(false);
  };

  const [hostypeList, setHostypeList] = useState<CityList>([]);
  // 获取医院类型
  const getHostypeList = async () => {
    const hostypeList = await reqGetCityList(10000);
    setHostypeList(hostypeList);
  };

  useEffect(() => {
    getHospitalList(current, pageSize, searchParams); // 第一次搜索searchParams是空对象
    // 获取省份数据
    getProvince();

    getHostypeList();
  }, []);

  /*
    接口文档地址：http://139.198.34.216:8202/swagger-ui.html#/

    省市区三级联动功能：
      一上来请求省的数据：/admin/cmn/dict/findByParentId/86
        当选中某个省，需要请求市的数据 /admin/cmn/dict/findByParentId/{parentId}
          当选中某个市，需要请求区的数据 /admin/cmn/dict/findByParentId/{parentId}
  */

  const [province, setProvince] = useState<CityList>([]);
  const [city, setCity] = useState<CityList>([]);
  const [district, setDistrict] = useState<CityList>([]);

  const getProvince = async () => {
    const province = await reqGetCityList(86);
    setProvince(province);
  };

  // 当省发送变化时触发的回调
  const handleProvinceChange = async (value: number) => {
    const city = await reqGetCityList(value);
    // 更新城市数据
    setCity(city);
    // 清空区的数据
    setDistrict([]);
    // 清空市和区选中的值
    // 问题：placeholder无了
    // form.setFieldsValue({
    //   cityCode: "",
    //   districtCode: "",
    // });
    // 重置表单（重置为空）
    form.resetFields(["cityCode", "districtCode"]);
  };

  // 当市发生变化时触发的回调
  const handleCityChange = async (value: number) => {
    const district = await reqGetCityList(value);
    setDistrict(district);
    // 重置表单（重置为空）
    form.resetFields(["districtCode"]);
  };

  // 更新医院状态
  const updateHospitalStatus = (id: string, status: Status) => {
    return async () => {
      await reqUpdateHospitalStatus(id, status === 0 ? 1 : 0); // 1 - status
      getHospitalList(current, pageSize, searchParams);
    };
  };

  const columns: ColumnsType<HospitalItem> = [
    {
      title: "序号",
      render: (row, records, index) => index + 1,
      align: "center",
      width: 80,
    },
    {
      title: "医院logo",
      // dataIndex: "logoData",
      // base64编码的图片
      render: (row) => <img className="hospital-logo" src={`data:image/jpeg;base64,${row.logoData}`} alt={row.hosname} />,
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "等级",
      render: (row) => row.param.hostypeString,
    },
    {
      title: "详细地址",
      // dataIndex: "param",
      // render: (param) => param.fullAddress,
      render: (row) => row.param.fullAddress,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (status) => (status === 0 ? "未上线" : "已上线"),
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
    },
    {
      title: "操作",
      width: 250,
      render: (row) => {
        return (
          <>
            <Button type="primary" onClick={goShowHospital(row.id)}>
              查看
            </Button>
            <Button type="primary" className="ml" onClick={goHospitalSchedule(row.hoscode)}>
              排班
            </Button>
            {/* 
              0 未上线 -- 应该显示上线按钮
              1 已上线 -- 应该显示下线按钮
            */}
            <Button type="primary" className="ml" onClick={updateHospitalStatus(row.id, row.status)}>
              {row.status === 0 ? "上线" : "下线"}
            </Button>
          </>
        );
      },
    },
  ];

  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useState<SearchHospitalListParams>({});

  // 提交表单触发的函数
  const onFinish = (values: SearchHospitalListParams) => {
    // const { hoscode, hosname, hostype, provinceCode, cityCode, districtCode, status } = values;
    // 更新搜索参数
    setSearchParams(values);
    // 每次搜索要从第一页开始搜索
    getHospitalList(1, 5, values);
  };

  // 清空
  const reset = () => {
    // 重置搜索条件
    setCurrent(1);
    setPageSize(5);
    setSearchParams({});
    // 重新搜索
    getHospitalList(1, 5, {});
    // 清空表单
    form.resetFields(); // 不传参数，清空整个表单，传了参数，清空部分表单
  };

  const navigate = useNavigate();

  // 跳转显示医院详情
  const goShowHospital = (id: string) => {
    return () => {
      navigate(`/syt/hospital/hospitalList/show/${id}`);
    };
  };

  // 跳转到医院排班
  const goHospitalSchedule = (hoscode: string) => {
    return () => {
      navigate(`/syt/hospital/hospitalList/schedule/${hoscode}`);
    };
  };

  return (
    <Card>
      <Form layout="inline" form={form} onFinish={onFinish}>
        {/* 
          name="xxx"
          1. 将来能够收集到表单数据
          2. 将来能通过name来设置表单项的值
        */}
        <Form.Item name="provinceCode">
          <Select style={{ width: 200 }} onChange={handleProvinceChange} placeholder="请选择省">
            {/* 
              <Option value="11111">111</Option>
                111 是选项显示的内容
                11111 是选项选中得到的值
            */}
            {province.map((provinceItem) => {
              // value使用id，因为将来使用id去请求市数据
              return (
                <Option key={provinceItem.id} value={provinceItem.id}>
                  {provinceItem.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item name="cityCode">
          <Select style={{ width: 200 }} onChange={handleCityChange} placeholder="请选择市">
            {city.map((cityItem) => {
              // value使用id，因为将来使用id去请求市数据
              return (
                <Option key={cityItem.id} value={cityItem.id}>
                  {cityItem.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item name="districtCode">
          <Select style={{ width: 200 }} placeholder="请选择区">
            {district.map((districtItem) => {
              return (
                <Option key={districtItem.id} value={districtItem.id}>
                  {districtItem.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item name="hosname">
          <Input placeholder="医院名称" />
        </Form.Item>

        <Form.Item name="hoscode">
          <Input placeholder="医院编号" />
        </Form.Item>

        <Form.Item className="mt" name="hostype">
          <Select style={{ width: 200 }} placeholder="医院类型">
            {hostypeList.map((hostypeItem) => {
              return (
                <Option key={hostypeItem.id} value={hostypeItem.value}>
                  {hostypeItem.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item className="mt" name="status">
          <Select style={{ width: 200 }} placeholder="医院状态">
            {/* 这样写，收集到的value是字符串类型 */}
            {/* <Option value="0">111</Option>
            <Option value="1">222</Option> */}
            {/* 下面写法，收集到的value是number类型 */}
            <Option value={0}>未上线</Option>
            <Option value={1}>已上线</Option>
          </Select>
        </Form.Item>

        <Form.Item className="mt">
          <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
            查询
          </Button>
          <Button className="ml" onClick={reset}>
            清空
          </Button>
        </Form.Item>
      </Form>

      <Table
        dataSource={hospitalList}
        columns={columns}
        className="mt"
        bordered
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          pageSizeOptions: [5, 10, 15, 20],
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `总共：${total}`,
          // 页码或 pageSize 改变的回调
          // onChange: (page, pageSize) => {
          //   // 发送请求，请求新的数据
          //   getHospitalSetList(page, pageSize);
          // },
          // onChange: getHospitalSetList,
          onChange: (current, pageSize) => {
            // 发送请求，请求新的数据
            getHospitalList(current, pageSize, searchParams);
          },
        }}
        loading={loading}
      />
    </Card>
  );
}
