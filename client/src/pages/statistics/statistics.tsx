import React, { Component, useEffect, useRef, useState } from 'react';
import Taro, { Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './statistics.less';

// import VChart from '@visactor/taro-vchart';

export function Pie() {
  // 1. 准备图表配置项与数据
  const [spec, setSpec] = useState({
    data: [
      {
        id: 'data1',
        values: [
          {
            value: 335,
            name: '直接访问',
          },
          {
            value: 310,
            name: '邮件营销',
          },
          {
            value: 274,
            name: '联盟广告',
          },
          {
            value: 235,
            name: '视频广告',
          },
          {
            value: 400,
            name: '搜索引擎',
          },
        ],
      },
    ],
    type: 'pie',
    outerRadius: 0.6,
    innerRadius: 0.5,
    categoryField: 'name',
    valueField: 'value',
    legends: {
      visible: true,
    },
  });

  // 向Chart组件, 传递参数.
  return (
    <View
      style={{
        border: '1px solid #eeeeee',
        width: '90vw',
      }}
    >
      {/* <VChart
        type="weapp"
        spec={spec}
        canvasId="pie"
        style={{ height: '35vh', width: '100%' }}
        onChartInit={() => {
          console.log('init pie');
        }}
        onChartReady={() => {
          console.log('ready pie');
        }}
        onChartUpdate={() => {
          console.log('update pie');
        }}
      /> */}
    </View>
  );
}

export default class Statistics extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="statistics">
        <Pie />
      </View>
    );
  }
}
