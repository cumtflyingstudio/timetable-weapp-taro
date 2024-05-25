import { Tag } from '@antmjs/vantui';
import { FC } from '@tarojs/taro';
import { useMemo } from 'react';
import { getKind, getStatus, IForm } from '../../../service/user/getMyForm';
import momentFormat from '../../../utils/momentFormat';

const ReservationCard: FC<{ item: IForm }> = (props) => {
  const {
    item: {
      status = 0,
      organizationName,
      endTime,
      startTime,
      resourceName,
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
  }, [startTime, endTime]);
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <div>
            地点:{organizationName}-{resourceName}
          </div>
          {Time}
        </div>
      </div>
    </>
  );
};

export default ReservationCard;
