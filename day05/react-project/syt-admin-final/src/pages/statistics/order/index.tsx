import React, { useEffect, useState, useRef } from "react";
import { Card, Form, Button, Input, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import * as echarts from "echarts";
import { getCountMap } from "@/api/statistics/orderStatistics";

const DatePick: any = DatePicker;

function StatisticsOrder() {
  const [form] = Form.useForm();
  const [chart, setChart] = useState<any>({});
  const inputEl = useRef<any>(null);

  useEffect(() => {
    const myEcharts = echarts.init(inputEl.current);
    setChart(myEcharts);
  }, []);

  const onFinish = async () => {
    const data = await getCountMap({});

    const option = {
      title: {
        text: "挂号量统计",
      },
      xAxis: {
        data: data.dateList,
      },
      yAxis: {},
      series: {
        type: "line",
        data: data.countList,
      },
    };

    chart.setOption(option);
  };

  return (
    <Card>
      <Form layout="inline" onFinish={onFinish} form={form}>
        <Form.Item name="hosname">
          <Input placeholder="点击输入医院名称" />
        </Form.Item>

        <Form.Item name="createTimeBegin">
          <DatePick placeholder="选择开始日期" />
        </Form.Item>

        <Form.Item name="createTimeEnd">
          <DatePick placeholder="选择截止日期" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />} style={{ marginRight: 10 }}>
            查询
          </Button>
        </Form.Item>
      </Form>

      <div ref={inputEl} style={{ width: "80%", height: 400, marginTop: 30 }}></div>
    </Card>
  );
}

export default StatisticsOrder;
