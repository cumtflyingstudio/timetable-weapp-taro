import { Button, Empty, Icon, Skeleton } from '@antmjs/vantui';
import { navigateTo, usePullDownRefresh } from '@tarojs/taro';
import { useNavigationBar, useRequest, useRouter } from 'taro-hooks';
import { useGlobalCurrRoom } from '../../hooks/useGlobalCurrRoom';
import queryOrganRoomById from '../../service/organ/queryOrganRoomById';
import showToast from '../../utils/showToast';
import AreaCard from './AreaCard';
import './roomDetail.less';
import Timetable from './Timetable';
import Taro from '@tarojs/taro';
import { useSubscribeForceRefresh } from '../../hooks/useSubscribeForceRefresh';

export default () => {
  const { currRoom, setCurrRoom, setCurrOrgan, setRooms, reset } =
    useGlobalCurrRoom();
  const [routerInfo] = useRouter();
  const { name, id } = routerInfo.params;

  useNavigationBar({ title: name });
  const { loading, refresh } = useRequest(
    async () => {
      return queryOrganRoomById(id as string)
        .then((res) => {
          setRooms(res);
          setCurrOrgan(id as string);
          setCurrRoom(res?.[0]?.roomId ?? '');
        })
        .catch((e) => {
          reset();
        });
    },
    {
      ready: id !== undefined,
    },
  );

  usePullDownRefresh(() => {
    refresh();
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 1000);
  });

  useSubscribeForceRefresh(() => {
    refresh();
  });

  const hasNoRoom =
    id === '' ||
    currRoom?.roomId === undefined ||
    currRoom?.roomName === undefined ||
    currRoom?.roomName === '' ||
    currRoom?.roomId === '';

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
      <AreaCard area={currRoom} />

      <Timetable area={currRoom} />

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
              url: `/pages/timeForm/timeForm?organizationId=${id}&title=${currRoom.roomName}&roomId=${currRoom.roomId}`,
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
