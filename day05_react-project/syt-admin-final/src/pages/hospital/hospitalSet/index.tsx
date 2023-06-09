import { useEffect, useState, Key } from "react";
import { Card, Form, Input, Button, Table, Tooltip, Modal, message } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/lib/table";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

import { reqGetHospitalSetList, reqRemoveHospital, reqBatchRemoveHospitals } from "@api/hospital/hospitalSet";
import { HospitalSetList, HospitalSetItem, SearchParams } from "@api/hospital/model/hospitalSetTypes";

import "./index.less";

// interface DataType {
//   id: string;
//   name: string;
//   money: string;
//   address: string;
// }

// const data = [
//   {
//     // 遍历的每项元素要求有一个唯一的key属性
//     id: "1",
//     name: "John Brown",
//     money: "￥300,000.00",
//     address: "New York No. 1 Lake Park",
//   },
//   {
//     id: "2",
//     name: "Jim Green",
//     money: "￥1,256,000.00",
//     address: "London No. 1 Lake Park",
//   },
//   {
//     id: "3",
//     name: "Joe Black",
//     money: "￥120,000.00",
//     address: "Sidney No. 1 Lake Park",
//   },
// ];

export default function HospitalSet() {
  // const { t } = useTranslation(["hospitalSet"]); // 必须指定使用语言包中哪个文件
  const [t] = useTranslation(["hospitalSet"]); // 必须指定使用语言包中哪个文件
  // 医院设置列表数据
  // 基本类型无所谓，引用类型（数组、对象）必须定义类型，否则将来使用会报错
  const [hospitalSetList, setHospitalSetList] = useState<HospitalSetList>([]);
  // loading
  const [loading, setLoading] = useState(false);
  // 当前页码
  const [current, setCurrent] = useState(1);
  // 每页条数
  const [pageSize, setPageSize] = useState(5);
  // 总数
  const [total, setTotal] = useState(0);

  const [lastHosname, setLastHosname] = useState("");
  const [lastHoscode, setLastHoscode] = useState("");

  // 定义异步请求数据的函数
  const getHospitalSetList = async (current: number, pageSize: number, hosname?: string, hoscode?: string) => {
    // console.log(hosname, hoscode);
    // 发送请求之前 - loading true
    setLoading(true);
    // 发送请求
    const res = await reqGetHospitalSetList({
      page: current,
      limit: pageSize,
      hoscode,
      hosname,
      /*
        点击查询按钮搜索：搜索条件至少为空串
        点击分页搜索：搜索条件一定是undefined
        结论：
          点击查询按钮搜索，一定使用传递过来的搜索条件
          点击分页搜索，一定使用上次的搜索条件
      */
      // hoscode: hoscode === "" || hoscode ? hoscode : lastHoscode,
      // hosname: hosname === "" || hosname ? hosname : lastHosname,
    });
    // 更新当前页码
    setCurrent(current);
    // 更新每页条数
    setPageSize(pageSize);
    // 更新数据
    setHospitalSetList(res.records);
    // 更新总数
    setTotal(res.total);
    // 请求完成 - loading false
    setLoading(false);
  };
  // 相当于生命周期函数中componentDidMount
  // 组件挂载完成时调用
  useEffect(() => {
    // useEffect接受的函数不能是async函数
    getHospitalSetList(current, pageSize);

    /*
      React Hook useEffect has missing dependencies: 'current' and 'pageSize'. Either include them or remove the dependency array

      意思：useEffect中缺少依赖项：current, pageSize
    
      [current, pageSize], 依赖项有什么作用？
        当依赖项中的数据发生变化，会重新调用useEffect函数


      不写，会导入死循环
      不能写[current, pageSize]，会导致请求发两次。
    */
  }, []);

  // 提交表单事件的回调函数
  // 注意：只有提交按钮才能触发
  const onFinish = (values: SearchParams) => {
    // 获取表单数据
    const {
      hosname,
      // = "",
      hoscode,
      // = ""
    } = values;
    // 在React中更新是异步的
    // 更新搜索条件 - 让将来的分页搜索可以获取到这个条件
    setLastHosname(hosname as string); // 将联合类型(undefined | string) 断言成string
    setLastHoscode(hoscode as string);
    // 发送请求
    getHospitalSetList(1, 5, hosname, hoscode);
    // getHospitalSetList(current, pageSize)
  };

  const navigate = useNavigate();
  // 跳转到添加医院
  const goAddHospital = () => {
    // 编程式导航
    navigate("/syt/hospital/hospitalSet/add");
  };

  // 跳转到修改医院
  // 高阶函数：目的给内部函数传递参数
  // 高阶函数，往往会生成闭包
  // 总结：如果定义回调函数希望传递其他的参数，可以使用高阶函数来完成
  const goUpdateHospital = (id: number) => {
    // 返回新的函数，才是click事件的回调函数
    return () => {
      navigate(`/syt/hospital/hospitalSet/edit/${id}`);
    };
  };

  // 显示删除对话框
  const showModal = (hosname: string, id: number) => {
    return () => {
      Modal.confirm({
        title: `您确认要删除 ${hosname} 数据吗？`,
        // content: "some messages...some messages...",
        async onOk() {
          // 发送请求，删除当前行数据
          await reqRemoveHospital(id);
          message.success("删除医院数据成功");
          // 重新请求最新的数据展示
          getHospitalSetList(current, pageSize, lastHosname, lastHoscode);
        },
        // okText: "确认",
        // cancelText: "取消",
      });
    };
  };
  // ColumnsType<行数据的类型>
  const columns: ColumnsType<HospitalSetItem> = [
    {
      // 列的标题
      title: t("index"),
      // 代表当前列，要渲染dataSource（数据）中的哪个
      // 当前列要渲染哪个数据
      // dataIndex: "name",
      /*
      不写render，只写dataIndex：只渲染纯文本数据
      render代表要渲染的内容

        写了dataIndex和render：渲染不同的内容
          render函数得到的数据，就是dataIndex对应的数据
        不写dataIndex,只写render：渲染不同的内容
          render函数得到的数据，就是整行数据
    */
      // render: (row) => <a>{JSON.stringify(row)}</a>,
      render: (row, record, index) => index + 1,
      width: 70,
      align: "center",
    },
    {
      title: t("hosname"),
      // 给当前列添加类名
      // className: "column-money",
      dataIndex: "hosname",
      // 布局方式：靠右
      // align: "right",
    },
    {
      title: t("hoscode"),
      dataIndex: "hoscode",
    },
    {
      title: t("apiUrl"),
      dataIndex: "apiUrl",
    },
    {
      title: t("signKey"),
      dataIndex: "signKey",
    },
    {
      title: t("contactsName"),
      dataIndex: "contactsName",
    },
    {
      title: t("contactsPhone"),
      dataIndex: "contactsPhone",
    },
    {
      title: t("operator"),
      // dataIndex: "address",
      // 固定在右边
      fixed: "right",
      width: 110,
      render: (row) => {
        // 不写dataIndex,render函数就能接收到整行数据
        // row就是当前行数据
        return (
          <>
            <Tooltip placement="top" title={t("updateBtnText")}>
              <Button type="primary" icon={<EditOutlined />} onClick={goUpdateHospital(row.id)} />
            </Tooltip>
            <Tooltip placement="top" title={t("removeBtnText")}>
              <Button type="primary" danger icon={<DeleteOutlined />} className="ml" onClick={showModal(row.hosname, row.id)} />
            </Tooltip>
          </>
        );
      },
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  // 复选框的选项
  const rowSelection = {
    // 复选框发生变化时触发事件
    onChange: (selectedRowKeys: Key[]) => {
      /*
        selectedRowKeys： 获取到当前选中的行的key值，因为我们设置rowKey: id,所以实际得到是当前选中的行id
        selectedRows: 获取到当前选中行的整行数据
      */
      // console.log(`selectedRowKeys:`, selectedRowKeys, "selectedRows: ", selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    },
    // getCheckboxProps: (record: any) => ({
    //   disabled: record.name === "Disabled User", // Column configuration not to be checked
    //   name: record.name,
    // }),
  };

  // 显示批量删除
  const showBatchRemoveModal = () => {
    Modal.confirm({
      title: `您确认要删除所有选中的数据吗？`,
      async onOk() {
        await reqBatchRemoveHospitals(selectedRowKeys);
        message.success("批量删除成功");
        // 清空选中的数据（这样按钮就会禁用了）
        setSelectedRowKeys([]);
        // 重新请求最新的数据展示
        getHospitalSetList(current, pageSize, lastHosname, lastHoscode);
      },
    });
  };

  // 清空
  const reset = () => {
    // 重置搜索条件
    setCurrent(1);
    setPageSize(5);
    setLastHoscode("");
    setLastHosname("");
    // 重新搜索
    getHospitalSetList(1, 5, "", "");
    // 清空表单
    form.resetFields(); // 不传参数，清空整个表单，传了参数，清空部分表单
  };

  const [form] = Form.useForm();

  return (
    <Card>
      {/* 
        Form 表单组件 
          layout="inline" 表单组件布局方式（行内布局） 
          onFinish={onFinish} 提交表单的事件
      */}
      <Form layout="inline" onFinish={onFinish} form={form}>
        {/*  
          Form.Item 单个表单项
            label 提示文字
            name 表单项名称（写了才能收集到数据）
              注意：名称一定要和接口文档的参数命名一致
        */}
        <Form.Item name="hosname">
          <Input placeholder={t("hosname")} />
        </Form.Item>
        <Form.Item name="hoscode">
          <Input placeholder={t("hoscode")} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
            {t("searchBtnText")}
          </Button>
          <Button className="ml" onClick={reset}>
            {t("resetBtnText")}
          </Button>
        </Form.Item>
      </Form>

      <div className="mtb">
        <Button type="primary" onClick={goAddHospital}>
          {t("addBtnText")}
        </Button>
        <Button type="primary" danger className="ml" disabled={!selectedRowKeys.length} onClick={showBatchRemoveModal}>
          {t("batchRemoveBtnText")}
        </Button>
      </div>

      {/* 
        Table 表格
          columns 列（表格渲染多少列）
          dataSource 行（表格渲染多少行数据）
          bordered 带边框
            bordered 等价于 bordered={true}
          rowKey="id" 表格行 key 的取值
          scroll={{ x: 1300 }} 开启x轴滚动条
          pagination 分页器组件
            current 当前页码
            pageSize 每页条数
            total 总数
            pageSizeOptions 每页条数选项
            showSizeChanger 是否显示每页条数
            showQuickJumper 是否显示快速跳转
            showTotal 显示总数
      */}
      <Table
        columns={columns}
        dataSource={hospitalSetList}
        bordered
        rowKey="id"
        scroll={{ x: 1300 }}
        pagination={{
          current,
          pageSize,
          total,
          pageSizeOptions: [5, 10, 15, 20],
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `${t("total")}${total}`,
          // 页码或 pageSize 改变的回调
          // onChange: (page, pageSize) => {
          //   // 发送请求，请求新的数据
          //   getHospitalSetList(page, pageSize);
          // },
          // onChange: getHospitalSetList,
          onChange: (current, pageSize) => {
            // 发送请求，请求新的数据
            getHospitalSetList(current, pageSize, lastHosname, lastHoscode);
          },
        }}
        loading={loading}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      />
    </Card>
  );
}
