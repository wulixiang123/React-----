import { useState, useEffect } from "react";
import { Card, Form, Input, DatePicker, Button, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getPageList } from "@/api/user/userInfo";

const RangePicker: any = DatePicker.RangePicker;

function UserList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [userList, setUserList] = useState([]);
  const [form] = Form.useForm();
  const [searchOption, setSearchOption] = useState({});

  const getUserList = async (page: number, limit: number, searchOption: any) => {
    const data = await getPageList(page, limit, searchOption);
    setTotal(data.total);
    setUserList(data.records);
  };

  const onFinish = (values: any) => {
    const { keyword, date } = values;

    const searchOption = {
      keyword,
      createTimeBegin: date && date[0].format("YYYY-MM-DD"),
      createTimeEnd: date && date[1].format("YYYY-MM-DD"),
    };

    setSearchOption(searchOption);

    getUserList(page, limit, searchOption);
  };

  const handleChange = (page: number, limit: number) => {
    setPage(page);
    setLimit(limit);
    getUserList(page, limit, searchOption);
  };

  const clear = () => {
    form.resetFields();
    setSearchOption({});
    setPage(1);
    setLimit(10);
    getUserList(1, 10, {});
  };

  useEffect(() => {
    getUserList(page, limit, searchOption);
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
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
    },
    { title: "昵称", dataIndex: "nickName", key: "nickName" },

    {
      title: "姓名",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (status ? "正常" : "异常"),
    },
    {
      title: "认证状态",
      dataIndex: "authStatus",
      key: "authStatus",
      render: (authStatus: number) => {
        if (authStatus === 2) {
          return "认证成功";
        } else if (authStatus === 1) {
          return "认证中";
        } else {
          return "未认证";
        }
      },
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "操作",
      key: "operator",
      width: 200,
      render: (row: any) => {
        return (
          <>
            <Button type="primary" style={{ marginRight: 10 }} onClick={() => navigate(`/syt/user/userInfo/show/${row.id}`)}>
              查看
            </Button>
            <Button type="primary" disabled>
              锁定
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Card>
      <Form layout="inline" onFinish={onFinish} form={form}>
        <Form.Item name="keyword">
          <Input placeholder="姓名/手机" />
        </Form.Item>

        <Form.Item label="创建时间" name="date">
          <RangePicker />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />} style={{ marginRight: 10 }}>
            查询
          </Button>
          <Button onClick={clear}>清空</Button>
        </Form.Item>
      </Form>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={userList}
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

export default UserList;
