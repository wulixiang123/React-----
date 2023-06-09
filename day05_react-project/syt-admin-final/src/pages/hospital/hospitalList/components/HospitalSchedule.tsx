import { Card, Row, Col, Tree, Tag, Pagination, Table, Button } from "antd";
import type { TreeProps } from "antd/lib/tree";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/lib/table";

import { reqGetDepartmentList, reqGetScheduleRuleList, reqGetDoctorList } from "@api/hospital/hospitalList";
import { DepartmentList, ScheduleRuleList, DoctorList, DoctorItem } from "@api/hospital/model/hospitalListTypes";

// const treeData: DataNode[] = [
//   {
//     title: "parent 1",
//     key: "0-0",
//     children: [
//       {
//         title: "parent 1-0",
//         key: "0-0-0",
//         // disabled: true,
//         children: [
//           {
//             title: "leaf",
//             key: "0-0-0-0",
//           },
//           {
//             title: "leaf",
//             key: "0-0-0-1",
//           },
//         ],
//       },
//       {
//         title: "parent 1-1",
//         key: "0-0-1",
//         children: [{ title: "xxx", key: "0-0-1-0" }],
//       },
//     ],
//   },
//   {
//     title: "parent 1",
//     key: "0-0",
//     children: [
//       {
//         title: "parent 1-0",
//         key: "0-0-0",
//         // disabled: true,
//         children: [
//           {
//             title: "leaf",
//             key: "0-0-0-0",
//           },
//           {
//             title: "leaf",
//             key: "0-0-0-1",
//           },
//         ],
//       },
//       {
//         title: "parent 1-1",
//         key: "0-0-1",
//         children: [{ title: "xxx", key: "0-0-1-0" }],
//       },
//     ],
//   },
//   {
//     title: "parent 1",
//     key: "0-0",
//     children: [
//       {
//         title: "parent 1-0",
//         key: "0-0-0",
//         // disabled: true,
//         children: [
//           {
//             title: "leaf",
//             key: "0-0-0-0",
//           },
//           {
//             title: "leaf",
//             key: "0-0-0-1",
//           },
//         ],
//       },
//       {
//         title: "parent 1-1",
//         key: "0-0-1",
//         children: [{ title: "xxx", key: "0-0-1-0" }],
//       },
//     ],
//   },
//   {
//     title: "parent 1",
//     key: "0-0",
//     children: [
//       {
//         title: "parent 1-0",
//         key: "0-0-0",
//         // disabled: true,
//         children: [
//           {
//             title: "leaf",
//             key: "0-0-0-0",
//           },
//           {
//             title: "leaf",
//             key: "0-0-0-1",
//           },
//         ],
//       },
//       {
//         title: "parent 1-1",
//         key: "0-0-1",
//         children: [{ title: "xxx", key: "0-0-1-0" }],
//       },
//     ],
//   },
//   {
//     title: "parent 1",
//     key: "0-0",
//     children: [
//       {
//         title: "parent 1-0",
//         key: "0-0-0",
//         // disabled: true,
//         children: [
//           {
//             title: "leaf",
//             key: "0-0-0-0",
//           },
//           {
//             title: "leaf",
//             key: "0-0-0-1",
//           },
//         ],
//       },
//       {
//         title: "parent 1-1",
//         key: "0-0-1",
//         children: [{ title: "xxx", key: "0-0-1-0" }],
//       },
//     ],
//   },
// ];

const columns: ColumnsType<DoctorItem> = [
  {
    title: "序号",
    render: (row, records, index) => index + 1,
    align: "center",
    width: 80,
  },
  {
    title: "职称",
    dataIndex: "title",
  },
  {
    title: "号源时间",
    dataIndex: "workDate",
  },
  {
    title: "总预约数",
    dataIndex: "reservedNumber",
  },
  {
    title: "剩余预约数",
    dataIndex: "availableNumber",
  },
  {
    title: "挂号费(元)",
    dataIndex: "amount",
  },
  {
    title: "擅长技能",
    dataIndex: "skill",
  },
];

export default function HospitalSchedule() {
  const params = useParams();
  const hoscode = params.hoscode as string;

  const [doctorList, setDoctorList] = useState<DoctorList>([]);
  // 获取医生列表
  const getDoctorList = async (depcode: string, workDate: string) => {
    try {
      const doctorList = await reqGetDoctorList({
        hoscode,
        depcode,
        workDate,
      });

      setDoctorList(doctorList);
    } catch {
      // 说明请求失败
      setDoctorList([]);
    }
  };

  const [hosname, setHosname] = useState(""); // 医院名称
  const [depname, setDepname] = useState(""); // 科室名称
  const [workDate, setWorkDate] = useState(""); // 日期

  const [depcode, setDepcode] = useState(""); // 科室编码
  const [total, setTotal] = useState(0); // 总数
  const [current, setCurrent] = useState(1); // 当前页码
  const [pageSize, setPageSize] = useState(5); // 每页条数
  const [scheduleRuleList, setScheduleRuleList] = useState<ScheduleRuleList>([]); // 排班日期列表

  // 获取排班日期列表
  const getScheduleRuleList = async (current: number, pageSize: number, depcode: string) => {
    /*
      page,limit设计成函数的参数
        --> 原因是将来分页器会触发一个事件，onChange事件，触发事件会传入最新的current和pageSize
        我们需要将最新的current和pageSize用来发送请求，只能用函数传参才行
      hoscode 参数位于地址栏params，直接获取使用即可
      depcode 默认情况下，使用科室列表第一条数据
    */
    const res = await reqGetScheduleRuleList({ page: current, limit: pageSize, hoscode, depcode });
    setCurrent(current);
    setPageSize(pageSize);
    setTotal(res.total);

    setScheduleRuleList(res.bookingScheduleList);

    setHosname(res.baseMap.hosname);
    // 可选链：aaa?.bbb 判断aaa是否有值，有值读取aaa.bbb并返回，没有值就返回aaa
    const workDate = res.bookingScheduleList[0]?.workDate; // 等价于下面写法
    // const workDate = res.bookingScheduleList[0] ? res.bookingScheduleList[0].workDate : res.bookingScheduleList[0];
    setWorkDate(workDate);

    return workDate;
  };

  const [departmentList, setDepartmentList] = useState<DepartmentList>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  // 获取科室列表
  const getDepartmentList = async () => {
    const departmentList = await reqGetDepartmentList(hoscode);
    // 更新医院科室列表
    setDepartmentList(
      departmentList.map((dep) => {
        return {
          ...dep,
          disabled: true, // 禁用第一级菜单
        };
      })
    );
    // 从医院科室列表中找出所有需要展开key
    setExpandedKeys(
      departmentList.map((dep) => {
        return dep.depcode; // 将第一次菜单key提取出来，组成需要展示keys
      })
    );

    const depcode = departmentList[0].children[0].depcode;
    // 更新depcode
    // 更新数据是异步的
    setDepcode(depcode);
    // console.log(depcode); // 打印不出来
    // 更新depname
    setDepname(departmentList[0].children[0].depname);

    // 将depcode返回出去
    return depcode;
  };

  // 统一获取数据的方法
  const getData = async () => {
    /*
      await 起到什么作用？
        等待，等待右边异步代码完成后在执行下面代码
    */
    // 请求科室数据(更新depcode)
    const depcode = await getDepartmentList();
    // 请求医院排班日期数据

    const workDate = await getScheduleRuleList(current, pageSize, depcode);

    // 最后一个可以不加await
    // 请求医生列表
    getDoctorList(depcode, workDate);
  };

  useEffect(() => {
    // 同时发送两个请求，谁先完成不一定，就不能保证更新depcode，在请求医院排班日期数据
    // 请求科室数据(更新depcode)
    // getDepartmentList();
    // 请求医院排班日期数据
    // getScheduleRuleList(1, 5);
    getData();
  }, []);

  // 当选中Tree中某个数据触发的事件回调
  // 当选择不同科室，科室发送变化时触发
  const onSelect: TreeProps["onSelect"] = async (selectedKeys, info: any) => {
    // selectedKeys 获取到选中元素的key属性的值
    // info.node 获取选中元素整个数据
    // console.log(selectedKeys, info);
    const depcode = selectedKeys[0] as string;
    setDepcode(depcode);
    setDepname(info.node.depname);
    // 请求排班数据
    const workDate = await getScheduleRuleList(current, pageSize, depcode);
    // 请求医院数据
    getDoctorList(depcode, workDate);
  };

  // 设置workDate
  const handleWorkDateClick = (workDate: string) => {
    return () => {
      setWorkDate(workDate);

      getDoctorList(depcode, workDate);
    };
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate("/syt/hospital/hospitalList");
  };

  // 整个屏幕的高度（浏览器窗口高度） - Header的高度 - Tabs的高度 - Card的上下padding - （p高度+下边距）
  const treeHeight = document.documentElement.clientHeight - 64 - 34 - 48 - 36;

  return (
    <Card>
      <p>
        选择：{hosname} / {depname} / {workDate}
      </p>
      <Row gutter={20}>
        {/* 栅格布局，一行24份 */}
        <Col span={5}>
          {/* 
            treeData 要渲染的数据
              [
                {
                  title: 标题,
                  key: Key,
                  children: 子菜单
                  disabled: true,  禁用菜单
                }
              ]
            
            defaultExpandedKeys 默认要展开的树
          */}
          <div
            style={{
              height: treeHeight,
              overflowY: "scroll",
              border: "1px solid silver",
            }}
          >
            {/* 
              treeData={departmentList} 直接写报错
                treeData要求的数据类型 和 departmentList类型不一致
                解决：
                  // https://github.com/ant-design/ant-design/issues/32912
                  // 目前antd官方没有太好解决方案，只有临时方案

                treeData={departmentList as []}

              defaultExpandAll 默认展开所有树节点
                不能使用。因为请求数据是异步的
                defaultExpandAll只能第一次生效，而第一次没有数据，所以没法全部展示
                后面数据才请求回来，此时defaultExpandAll不能使用
              defaultExpandedKeys
                不能使用。原因同上
            */}
            <Tree
              // defaultExpandAll
              // defaultExpandedKeys={["0-0"]}
              selectedKeys={[depcode]}
              expandedKeys={expandedKeys}
              onSelect={onSelect}
              treeData={departmentList as []}
              fieldNames={{ title: "depname", key: "depcode" }}
            />
          </div>
        </Col>
        <Col span={19}>
          {scheduleRuleList.map((scheduleRuleItem) => {
            return (
              // 将来数据会发送变化，key就不能使用index
              <Tag
                color={workDate === scheduleRuleItem.workDate ? "green" : ""}
                key={scheduleRuleItem.workDate}
                style={{ marginBottom: 10 }}
                onClick={handleWorkDateClick(scheduleRuleItem.workDate)}
              >
                <div>
                  {scheduleRuleItem.workDate} {scheduleRuleItem.dayOfWeek}
                </div>
                <div>
                  {scheduleRuleItem.availableNumber} / {scheduleRuleItem.reservedNumber}
                </div>
              </Tag>
            );
          })}

          <Pagination
            style={{ marginTop: 10 }}
            total={total}
            current={current}
            pageSize={pageSize}
            showSizeChanger
            pageSizeOptions={[5, 10, 15, 20]}
            onChange={async (current, pageSize) => {
              const workDate = await getScheduleRuleList(current, pageSize, depcode);
              getDoctorList(depcode, workDate);
            }}
          />

          <Table columns={columns} dataSource={doctorList} rowKey="id" bordered className="mt" pagination={false} />

          <Button className="mt" onClick={goBack}>
            返回
          </Button>
        </Col>
      </Row>
    </Card>
  );
}
