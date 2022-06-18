import {
  Empty,
  Divider,
  DropdownMenu,
  DropdownItem,
  Sticky,
} from '@antmjs/vantui';
import { usePagination } from '@flying-studio/use-pagination';
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { useState } from 'react';
import getRoomUsing, { IForm } from '../../service/user/getRoomUsing';
import ShowCard, { getStatus } from './ShowCard';
import './timetable.less';

export default () => {
  const { data, loading, refresh, run } = usePagination(getRoomUsing);
  const [state, setState] = useState({
    option1: [
      {
        text: '全部场地',
        value: '全部',
      },
      {
        text: '教室',
        value: '教室',
      },
      {
        text: '设备',
        value: '设备',
      },
    ],
    option2: [
      {
        text: '全部类型',
        value: -1,
      },
      {
        text: getStatus(0).name,
        value: 0,
      },
      {
        text: getStatus(1).name,
        value: 1,
      },
      {
        text: getStatus(2).name,
        value: 2,
      },
    ],
    value1: '全部',
    value2: -1,
  });
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
  return (
    <>
      <Sticky>
        <DropdownMenu>
          <DropdownItem
            value={state.value1}
            options={state.option1}
            onChange={(value: string) => {
              setState({ ...state, value1: value });
            }}
          />
          <DropdownItem
            value={state.value2}
            options={state.option2}
            onChange={(value: number) => {
              setState({ ...state, value2: value });
            }}
          />
        </DropdownMenu>
      </Sticky>
      <div style={{ minHeight: '100vh', marginBottom: '50px' }}>
        {data
          .filter((item) => {
            if (state.value1 === '全部') {
              return true;
            }
            return item.kind === state.value1;
          })
          .filter((item) => {
            if (state.value2 === -1) {
              return true;
            }
            return item.status === state.value2;
          })
          .map((item) => {
            return (
              <div style={{ margin: 10 }} key={item.id as number}>
                <ShowCard item={item as IForm} />
              </div>
            );
          })}
        {data.length !== 0 ? (
          <Divider contentPosition="center">没有更多啦～</Divider>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
