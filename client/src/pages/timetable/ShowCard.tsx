import { Tag } from '@antmjs/vantui';
import { FC } from '@tarojs/taro';
import { IForm } from '../../service/user/getRoomUsing';

const ShowCard: FC<{ item: IForm }> = (props) => {
  const { item } = props;
  return (
    <div style={{ borderRadius: 20, padding: '20rpx', background: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 'bold' }}>{item.applyInfo}</div>
        <div>
          <Tag round color={item.status ? 'green' : 'red'}>
            {item.status ? '已通过' : '未通过'}
          </Tag>
        </div>
      </div>
      <div>
        地点:{item.organizationName} - {item.rentName}
      </div>
      <div>开始时间:{item.startTime}</div>
      <div>结束时间:{item.endTime}</div>
    </div>
  );
};

export default ShowCard;
