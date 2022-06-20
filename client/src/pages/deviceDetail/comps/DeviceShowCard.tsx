import { Tag } from '@antmjs/vantui';
import Taro, { FC } from '@tarojs/taro';
import { IDevice } from '../../../service/device/getAllDevice';

const DeviceShowCard: FC<{ item: IDevice }> = (props) => {
  const { item } = props;
  return (
    <div style={{ borderRadius: 20, padding: '20rpx', background: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 'bold' }}>{item.deviceName}</div>
      </div>
      <div>
        数量：{item.usingNum} / {item.total}
      </div>
    </div>
  );
};
export default DeviceShowCard;
