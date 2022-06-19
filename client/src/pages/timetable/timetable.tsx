import { Empty } from '@antmjs/vantui';
import { usePagination } from '@flying-studio/use-pagination';
import Taro, { usePullDownRefresh, useReachBottom, FC } from '@tarojs/taro';
import { useEffect } from 'react';
import getRoomUsing, { IForm } from '../../service/user/getRoomUsing';
import { useTimetableList } from './useTimetableList';
import './timetable.less';
import FormList from './comps/FormList';
import useFilter from './comps/useFilter';
import { TimetableListPage } from './TimetableListPage';

export default () => {
  const { store } = useTimetableList();
  return (
    <TimetableListPage
      requestFunc={getRoomUsing}
      onChange={(data) => {
        store.forms = data;
      }}
    />
  );
};
