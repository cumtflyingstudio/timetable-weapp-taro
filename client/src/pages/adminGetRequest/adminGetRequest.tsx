import { useRouter } from 'taro-hooks';
import Taro, { Config } from '@tarojs/taro';
import { Component } from 'react';
import './adminGetRequest.less';
import getRoomForm from '../../service/admin/getRoomForm';
import { TimetableListPage } from '../timetable/TimetableListPage';

export default () => {
  const [routerInfo] = useRouter();
  const { id = 0 } = routerInfo.params;

  return (
    <>
      <TimetableListPage requestFunc={getRoomForm} />
    </>
  );
};
