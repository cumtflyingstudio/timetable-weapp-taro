import { FC } from '@tarojs/taro';
import { Divider, Empty } from '@antmjs/vantui';
import type { IForm } from '../../../service/user/getRoomUsing';
import ReservationCard from './ReservationCard';

const FormList: FC<{ list: IForm[]; onClick?: (item: IForm) => void }> = (
  props,
) => {
  const { list, onClick } = props;
  return (
    <div style={{ minHeight: '100vh', marginBottom: '50px' }}>
      {list.length === 0 ? <Empty description="没有更多" /> : <></>}
      {list.map((item) => {
        return (
          <div
            onClick={() => {
              onClick && onClick(item);
            }}
            style={{ margin: 10 }}
            key={item.reservationId}
          >
            <ReservationCard item={item} />
          </div>
        );
      })}
      {list.length !== 0 ? (
        <Divider contentPosition="center">没有更多啦～</Divider>
      ) : (
        <></>
      )}
    </div>
  );
};
export default FormList;
