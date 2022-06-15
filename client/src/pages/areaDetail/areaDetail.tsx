import { Button, Icon } from '@antmjs/vantui';
import { navigateTo } from '@tarojs/taro';
import { useLayoutEffect, useEffect } from 'react';
import { useNavigationBar, useRouter } from 'taro-hooks';
import './areaDetail.less';
import queryOrganRoomById from '../../service/organ/queryOrganRoomById';
import { useCurrRoomStore } from './useCurrRoomStore';
import AreaCard from './AreaCard';
import Timetable from './Timetable';

export default () => {
  const { store } = useCurrRoomStore();
  //标题
  const [routerInfo] = useRouter();
  const { name, id } = routerInfo.params;
  useNavigationBar({ title: name });
  // request:请求area列表
  useEffect(() => {
    queryOrganRoomById(id as string).then((res) => {
      store.rooms = Object.fromEntries(res.map((item) => [item.roomId, item]));
      store.currentId = res[0].roomId;
    });
  }, []);
  return (
    <>
      <AreaCard area={store.rooms[store.currentId]} />

      <Timetable area={store.rooms[store.currentId]} />

      <Button
        color="#4cc8b9"
        round={true}
        style="height:60px;width:60px;position:fixed;right:20px;bottom:100px;"
        onClick={() => {
          navigateTo({ url: `/pages/timeForm/timeForm?id=${id}` });
        }}
      >
        <Icon size="30px" color="white" name="plus" />
      </Button>
    </>
  );
};
