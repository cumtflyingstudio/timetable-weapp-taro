import { Empty } from '@antmjs/vantui';
import Taro, { FC, usePullDownRefresh } from '@tarojs/taro';
import { useEffect } from 'react';
import { useRequest } from 'taro-hooks';
import { IForm } from '../../service/user/getMyForm';
import FormList from './comps/FormList';
import useFilter, { DropDownMenu } from './comps/useFilter';
import './timetable.less';

export const TimetableListPage: FC<{
  requestFunc: (currPage: number) => Promise<IForm[]>;
  onChange?: (arg: IForm[]) => void; // get pagination data can use this one
  onClick?: (id: IForm) => void;
}> = ({ onChange, requestFunc, onClick = () => {} }) => {
  // TODO: 分页
  // const { data, loading, refresh, run } = usePagination(requestFunc, {
  //   idPropertyName: 'applyId',
  //   initialPage: 1,
  //   beforeAllRequest: () => {},
  // });
  let req = () => requestFunc(1);

  const { data = [], loading, refresh, run } = useRequest(req);

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
  // useReachBottom(() => {
  //   run();
  // });
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
      <DropDownMenu state={state} setState={setState} />
      <FormList list={list} onClick={onClick} />
    </>
  );
};
