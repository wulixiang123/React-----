import React, { useState, useEffect } from "react";
import { Card, Form, Input, DatePicker, Button, Table, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getStatusList, getPageList } from "@/api/order/orderInfo";

const { Option } = Select;

const DatePick: any = DatePicker;

function OrderList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [form] = Form.useForm();
  const [searchOption, setSearchOption] = useState({});

  const getOrderList = async (page: number, limit: number, searchOption: any) => {
    const data = await getPageList(page, limit, searchOption);
    setTotal(data.total);
    setOrderList(data.records);
  };

  const onFinish = (values: any) => {
    const searchOption = {
      ...values,
      createTimeBegin: values.createTimeBegin?.format("YYYY-MM-DD"),
      createTimeEnd: values.createTimeEnd?.format("YYYY-MM-DD"),
      reserveDate: values.reserveDate?.format("YYYY-MM-DD"),
    };

    setSearchOption(searchOption);

    getOrderList(page, limit, searchOption);
  };

  const handleChange = (page: number, limit: number) => {
    setPage(page);
    setLimit(limit);
    getOrderList(page, limit, searchOption);
  };

  const clear = () => {
    form.resetFields();
    setSearchOption({});
    setPage(1);
    setLimit(10);
    getOrderList(1, 10, {});
  };

  useEffect(() => {
    getOrderList(page, limit, searchOption);

    const getStatus = async () => {
      const data = await getStatusList();
      setStatusList(data);
    };

    getStatus();
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
      title: "订单交易号",
      dataIndex: "outTradeNo",
      key: "outTradeNo",
    },
    { title: "医院名称", dataIndex: "hosname", key: "hosname" },

    {
      title: "科室名称",
      key: "depname",
      dataIndex: "depname",
    },
    {
      title: "医生职称",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "安排时间",
      dataIndex: "fetchTime",
      key: "fetchTime",
    },
    {
      title: "就诊人",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "预约号序",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "服务费(元)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "订单状态",
      key: "orderStatusString",
      render: (row: any) => row.param.orderStatusString,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "操作",
      key: "operator",
      render: (row: any) => {
        return (
          <>
            <Button type="primary" onClick={() => navigate(`/syt/order/orderInfo/show/${row.id}`)}>
              查看
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Card>
      <Form layout="inline" onFinish={onFinish} form={form}>
        <Form.Item name="hosname">
          <Input placeholder="医院名称" />
        </Form.Item>

        <Form.Item name="outTradeNo">
          <Input placeholder="订单号" />
        </Form.Item>

        <Form.Item name="patientName">
          <Input placeholder="就诊人姓名" />
        </Form.Item>

        <Form.Item name="createTimeBegin">
          <DatePick placeholder="选择开始日期" />
        </Form.Item>

        <Form.Item name="createTimeEnd">
          <DatePick placeholder="选择截止日期" />
        </Form.Item>

        <Form.Item name="reserveDate">
          <DatePick placeholder="选择就诊时间" />
        </Form.Item>

        <Form.Item name="orderStatus">
          <Select placeholder="订单状态" style={{ width: 182, marginTop: 10 }}>
            {statusList.map((item: any) => {
              return (
                <Option value={item.status} key={item.status}>
                  {item.comment}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />} style={{ marginRight: 10, marginTop: 10 }}>
            查询
          </Button>
          <Button onClick={clear}>清空</Button>
        </Form.Item>
      </Form>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={orderList}
        bordered
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
          onChange: handleChange,
        }}
      />
    </Card>
  );
}

export default OrderList;
