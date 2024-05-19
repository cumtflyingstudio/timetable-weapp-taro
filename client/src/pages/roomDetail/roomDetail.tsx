import { Button, Empty, Icon, Skeleton } from '@antmjs/vantui';
import { navigateTo } from '@tarojs/taro';
import { useEffect } from 'react';
import { useNavigationBar, useRequest, useRouter } from 'taro-hooks';
import './roomDetail.less';
import queryOrganRoomById from '../../service/organ/queryOrganRoomById';
import { useCurrRoomStore } from './useCurrRoomStore';
import AreaCard from './AreaCard';
import Timetable from './Timetable';
import showToast from '../../utils/showToast';

export default () => {
  const { store } = useCurrRoomStore();
  //页面导航栏标题为 易班——场地
  const [routerInfo] = useRouter();
  const { name, id } = routerInfo.params;
  useNavigationBar({ title: name });
  // request:请求area列表
  const { loading } = useRequest(async () => {
    return queryOrganRoomById(id as string)
      .then((res) => {
        store.rooms = Object.fromEntries(
          res.map((item) => [item.roomId, item]),
        );
        store.currentId = res?.[0]?.roomId ?? '';
      })
      .catch((e) => {
        console.log(e.message);
        store.rooms = {};
        store.currentId = '';
      });
  });

  //易班-实验室1
  const currArea = store.rooms[store.currentId];
  const hasNoRoom =
    id === '' ||
    currArea?.roomId === undefined ||
    currArea?.roomName === undefined ||
    currArea?.roomName === '' ||
    currArea?.roomId === '';

  if (loading) {
    return <Skeleton title={true} row={3} />;
  }

  if (hasNoRoom) {
    return (
      <Empty
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
        }}
        description="该组织暂无可预约场地"
      ></Empty>
    );
  }
  return (
    <>
      <AreaCard area={currArea} />

      <Timetable area={currArea} />

      <Button
        color="#4cc8b9"
        round
        style="height:60px;width:60px;position:fixed;right:20px;bottom:100px;"
        onClick={() => {
          try {
            if (hasNoRoom) {
              showToast('该组织暂无可预约场地');
              return;
            }
            navigateTo({
              url: `/pages/timeForm/timeForm?organizationId=${id}&title=${currArea.roomName}&roomId=${currArea.roomId}`,
            });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <Icon size="30px" color="white" name="plus" />
      </Button>
    </>
  );
};
