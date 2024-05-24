import { Tag } from '@antmjs/vantui';
import { FC } from '@tarojs/taro';
import { useMemo } from 'react';
import { IForm } from '../../../service/user/getMyForm';
import momentFormat from '../../../utils/momentFormat';

export function getStatus(status: number) {
  switch (status) {
    case 0:
      return { name: '已拒绝', color: 'red' };
    case 1:
      return { name: '已通过', color: 'green' };
    case 2:
      return { name: '待审核', color: 'orange' };
    default:
      return { name: '被闲置', color: 'gray' };
  }
}
export function getKind(kind: string) {
  switch (kind) {
    case '场地':
      return { name: '场地', color: 'skyblue' };
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
  const Time = useMemo(() => {
    return (
      <>
        <div>开始时间:{momentFormat(startTime, 'yyyy-MM-DD HH:mm')}</div>
        <div>结束时间:{momentFormat(endTime, 'yyyy-MM-DD HH:mm')}</div>
      </>
    );
  }, []);
  return (
    <>
      <div style={{ borderRadius: 20, padding: '20rpx', background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 'bold', flex: 1 }}>{applyInfo}</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '10px',
              flex: 1,
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
        <div>地点:{organizationName}</div>
        {Time}
      </div>
    </>
  );
};

export default ShowCard;
