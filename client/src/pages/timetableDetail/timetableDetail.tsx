import { useRouter } from 'taro-hooks';
import Taro, { Config } from '@tarojs/taro';
import { Component } from 'react';
import { View, Text } from '@tarojs/components';
import './timetableDetail.less';
import { useTimetableList } from '../timetable/useTimetableList';

export default () => {
  const [routerInfo] = useRouter();
  const { id = 0 } = routerInfo.params;
  const { store } = useTimetableList();
  const currForm = store.forms.find((item) => {
    return item.id == id;
  });
  if (id === 0) {
    return <div>{id}</div>;
  }
  // return <div></div>;
  return <div>{currForm?.applyInfo}</div>;
};
