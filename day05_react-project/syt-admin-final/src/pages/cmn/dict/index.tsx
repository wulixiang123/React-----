import { useEffect, useState } from "react";
import { Card, Table } from "antd";
import type { ColumnsType } from "antd/lib/table";

import { RightOutlined, DownOutlined } from "@ant-design/icons";

import { reqGetCityList } from "@api/hospital/hospitalList";
import { CityList, CityItem } from "@api/hospital/model/hospitalListTypes";

const columns: ColumnsType<CityItem> = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "编码",
    dataIndex: "dictCode",
  },
  {
    title: "值",
    dataIndex: "value",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
];

export default function Dict() {
  const [dictList, setDictList] = useState<CityList>([]);

  const getCityList = async (id: number) => {
    const dictList = await reqGetCityList(id);

    setDictList(
      dictList.map((item) => {
        return {
          ...item,
          // 给item添加children属性，就会在table显示可展开图标
          children: [],
        };
      })
    );
  };

  useEffect(() => {
    getCityList(1);
  }, []);

  type TriggerEventHandler<T> = (record: T, event: React.MouseEvent<HTMLElement>) => void;
  // 处理图标点击事件
  const handleIconExpand = (record: CityItem, onExpand: TriggerEventHandler<CityItem>) => {
    // onClick={(e) => onExpand(record, e)}
    return async (e: React.MouseEvent<HTMLElement>) => {
      // 如果子菜单有值就不重新请求了
      if (!record.children.length) {
        // 请求子菜单数据
        let list = await reqGetCityList(record.id);

        list = list.map((item) => {
          return item.hasChildren
            ? {
                ...item,
                children: [],
              }
            : item;
        });

        // 将子菜单数据添加到父级生效
        record.children = list;
      }
      // 菜单就会展开
      onExpand(record, e);
    };
  };

  return (
    <Card>
      <Table
        columns={columns}
        dataSource={dictList}
        bordered
        rowKey="id"
        pagination={false}
        expandable={{
          // 展开的事件
          // onExpand,
          // 展开的图标
          expandIcon: ({ expanded, record, onExpand }) => {
            /*
              expanded 是否展开
              record 当前行数据
              onExpand 触发onExpand事件
                onExpand(record, e)
            */
            // console.log(record);
            // 没有子菜单，就不渲染图标
            if (!record.hasChildren) {
              return <div style={{ display: "inline-block", width: 24, height: 10 }}></div>;
            }

            return expanded ? (
              // 向下箭头，点击折叠即可
              <DownOutlined style={{ marginRight: 10 }} onClick={(e) => onExpand(record, e)} />
            ) : (
              // 向右箭头，点击需要请求子菜单数据展示
              // <RightOutlined style={{ marginRight: 10 }} onClick={(e) => onExpand(record, e)} />
              <RightOutlined style={{ marginRight: 10 }} onClick={handleIconExpand(record, onExpand)} />
            );
          },
        }}
      />
    </Card>
  );
}
