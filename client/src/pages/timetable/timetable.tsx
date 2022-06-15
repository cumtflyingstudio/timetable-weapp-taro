import { usePagination } from '@flying-studio/use-pagination';
import Taro, { usePullDownRefresh } from '@tarojs/taro';
import './timetable.less';
import getRoomUsing, { IForm } from '../../service/user/getRoomUsing';
import ShowCard from './ShowCard';

export default () => {
  const { data, loading, refresh } = usePagination<IForm>(getRoomUsing, {
    idPropertyName: 'id',
    initialPage: 1,
    beforeAllRequest: () => {},
  });
  usePullDownRefresh(() => {
    refresh();
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 1000);
  });
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'scroll' }}>
      {data.map((item) => {
        return (
          <div style={{ margin: 10 }} key={item.id as number}>
            <ShowCard item={item as IForm} />
          </div>
        );
      })}
    </div>
  );
};
