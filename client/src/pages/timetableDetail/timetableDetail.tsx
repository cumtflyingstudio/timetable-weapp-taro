import { useRequest, useRouter } from 'taro-hooks';
import Taro from '@tarojs/taro';
import './timetableDetail.less';
import { getReservationDetail } from '../../service/reservation/getReservationDetail';
import {
  Button,
  Cell,
  Dialog,
  Divider,
  Icon,
  Skeleton,
  Tag,
} from '@antmjs/vantui';
import momentFormat from '../../utils/momentFormat';
import { getKind, getStatus } from '../../service/user/getRoomUsing';
import { forceRefresh } from '../../hooks/useSubscribeForceRefresh';
import { useGlobalUserInfo } from '../../hooks/useGlobalUserInfo';
import { deleteReservation } from '../../service/reservation/deleteReservation';
import { showToast } from '../../utils';

export default () => {
  const [routerInfo] = useRouter();
  const { reservationId } = routerInfo.params;
  const { userInfo } = useGlobalUserInfo();

  const ready = !Number.isNaN(reservationId);
  const { data, loading, error } = useRequest(
    () => getReservationDetail(Number(reservationId)),
    {
      ready,
    },
  );

  if (!data) {
    return <Skeleton loading={true} />;
  }

  const {
    introduction,
    username,
    nickname,
    note,
    phone,
    status,
    roomId,
    roomName,
    startTime,
    endTime,
  } = data;
  return (
    <Skeleton loading={loading}>
      <div
        style={{
          background: 'white',
          padding: 12,
          margin: 6,
          borderRadius: 12,
        }}
      >
        <div
          style={{
            padding: '10px',
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 'bold' }}>{note}</div>
          <div style={{ color: 'gray' }}>地点: {roomName}</div>
          <div style={{ color: 'gray' }}>
            开始时间: {momentFormat(startTime, 'yyyy-MM-DD HH:mm')}
          </div>
          <div style={{ color: 'gray' }}>
            结束时间: {momentFormat(endTime, 'yyyy-MM-DD HH:mm')}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {/* TODO: 设备和状态 */}
          <Tag round size="large" color={getKind('场地').color}>
            {getKind('场地').name}
          </Tag>
          <Tag round size="large" color={getStatus(2).color}>
            {getStatus(2).name}
          </Tag>
        </div>
        <Divider />

        <Cell title="预约编号" value={reservationId ?? ''} />
        <Cell title="预约人昵称" value={nickname ?? ''} />
        <Cell title="预约人联系方式" value={phone ?? ''} />
        <Cell title="预约人个人介绍" value={introduction ?? ''} />
      </div>

      {userInfo.username === username ? (
        <Button
          size="large"
          type="danger"
          round
          plain
          hairline
          style={{
            marginTop: '50px',
          }}
          onClick={() => {
            if (!reservationId) {
              showToast('发生错误');
              return;
            }

            Dialog.confirm({
              selector: 'whetherDelete',
              message: '是否要删除预约？',
              onConfirm: () => {
                deleteReservation(Number(reservationId)).then(() => {
                  setTimeout(() => {
                    Taro.navigateBack();
                  }, 500);
                  forceRefresh();
                  showToast("删除成功")
                });
              },
              onCancel: () => {
                console.log('用户点击了取消');
              },
            });
          }}
        >
          删除
        </Button>
      ) : (
        <></>
      )}
      <Dialog
        overlay
        closeOnClickOverlay
        id="whetherDelete"
        confirmButtonText="确定"
        cancelButtonText="取消"
      />
    </Skeleton>
  );
};
