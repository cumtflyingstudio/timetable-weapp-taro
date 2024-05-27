import { Empty } from '@antmjs/vantui';
import Taro, { FC, usePullDownRefresh } from '@tarojs/taro';
import { useEffect, useMemo } from 'react';
import { useRequest } from 'taro-hooks';
import { IForm } from '../../service/user/getRoomUsing';
import FormList from './comps/FormList';
import useFilter, { DropDownMenu } from './comps/useFilter';
import './timetable.less';
import { useSubscribeForceRefresh } from '../../hooks/useSubscribeForceRefresh';

export const TimetableListPage: FC<{
  requestFunc: (currPage: number) => Promise<IForm[]>;
  onChange?: (arg: IForm[]) => void; // get pagination data can use this one
  onClick?: (id: IForm) => void;
}> = ({ onChange, requestFunc, onClick = () => {} }) => {
  // TODO: 分页
  let req = () => requestFunc(1);

  const { data = [], loading, refresh, run } = useRequest(req);

  useSubscribeForceRefresh(() => {
    refresh();
  });

  useEffect(() => {
    onChange && onChange(data);
  }, [data.length]);

  const { state, setState, firstValue, secondValue } = useFilter();
  usePullDownRefresh(() => {
    refresh();
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 1000);
  });

  const list = useMemo(() => {
    return data
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
  }, [data, firstValue, secondValue]);

  if (data.length === 0) {
    return <Empty description="您还没有申请过预约" />;
  }

  return (
    <>
      <DropDownMenu state={state} setState={setState} />
      <FormList list={list} onClick={onClick} />
    </>
  );
};
