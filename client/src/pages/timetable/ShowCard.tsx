import { Tag } from '@antmjs/vantui';
import { FC } from '@tarojs/taro';
import { IForm } from '../../service/user/getRoomUsing';

export function getStatus(status: number) {
  switch (status) {
    case 0:
      return { name: '待审核', color: 'orange' };
    case 1:
      return { name: '已通过', color: 'green' };
    case 2:
      return { name: '已拒绝', color: 'red' };
    default:
      return { name: '被闲置', color: 'gray' };
  }
}
export function getKind(kind: string) {
  switch (kind) {
    case '教室':
      return { name: '教室', color: 'skyblue' };
    case '设备':
      return { name: '设备', color: 'blue' };
    default:
      return { name: '被闲置', color: 'gray' };
  }
}

const ShowCard: FC<{ item: IForm }> = (props) => {
  const {
    item: {
      status = 0,
      organizationName,
      endTime,
      startTime,
      rentName,
      applyInfo,
      kind,
    },
  } = props;
  return (
    <div style={{ borderRadius: 20, padding: '20rpx', background: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 'bold' }}>{applyInfo}</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Tag round size="large" color={getKind(kind).color}>
            {getKind(kind).name}
          </Tag>
          <Tag round size="large" color={getStatus(status)?.color}>
            {getStatus(status).name}
          </Tag>
        </div>
      </div>
      <div>
        地点:{organizationName} - {rentName}
      </div>
      <div>开始时间:{startTime}</div>
      <div>结束时间:{endTime}</div>
    </div>
  );
};

export default ShowCard;
