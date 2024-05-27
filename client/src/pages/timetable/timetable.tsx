import Taro from '@tarojs/taro';
import getRoomUsing, { IForm } from '../../service/user/getRoomUsing';
import './timetable.less';
import { TimetableListPage } from './TimetableListPage';
import { useCallback } from 'react';

export default () => {
  const handleClickItem = useCallback((item: IForm) => {
    Taro.navigateTo({
      url: `/pages/timetableDetail/timetableDetail?reservationId=${item.reservationId}`,
    });
  }, []);
  return (
    <>
      <TimetableListPage
        requestFunc={getRoomUsing}
        onChange={(data) => {}}
        onClick={handleClickItem}
      />
    </>
  );
};
