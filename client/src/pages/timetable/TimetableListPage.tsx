import { Empty } from '@antmjs/vantui';
import { usePagination } from '@flying-studio/use-pagination';
import Taro, { usePullDownRefresh, useReachBottom, FC } from '@tarojs/taro';
import { useEffect } from 'react';
import getRoomUsing, { IForm } from '../../service/user/getRoomUsing';
import { useTimetableList } from './useTimetableList';
import './timetable.less';
import FormList from './comps/FormList';
import useFilter from './comps/useFilter';

export const TimetableListPage: FC<{
  requestFunc: (currPage: number) => Promise<IForm[]>;
  onChange?: (arg: IForm[]) => void;
}> = ({ onChange, requestFunc }) => {
  const { data, loading, refresh, run } = usePagination(requestFunc);
  useEffect(() => {
    onChange && onChange(data);
  }, [data.length]);

  const { DropDownMenu, firstValue, secondValue } = useFilter();
  usePullDownRefresh(() => {
    refresh();
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 1000);
  });
  useReachBottom(() => {
    run();
  });
  if (data.length === 0) {
    return <Empty description="您还没有申请过预约" />;
  }
  const list = data
    .filter((item) => {
      if (firstValue === '全部') {
        return true;
      }
      return item.kind === firstValue;
    })
    .filter((item) => {
      if (secondValue === -1) {
        return true;
      }
      return item.status === secondValue;
    });
  return (
    <>
      <DropDownMenu />
      <FormList list={list} />
    </>
  );
};
