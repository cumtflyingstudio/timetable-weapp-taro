import { useRouter } from 'taro-hooks';
import Taro, { Config } from '@tarojs/taro';
import { Component } from 'react';
import './adminGetRequest.less';
import getRoomForm from '../../service/admin/getRoomForm';
import { TimetableListPage } from '../timetable/TimetableListPage';

export default () => {
  return (
    <>
      <TimetableListPage requestFunc={getRoomForm} />
    </>
  );
};
