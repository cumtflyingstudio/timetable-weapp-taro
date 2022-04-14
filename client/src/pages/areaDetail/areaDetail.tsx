import { useLayoutEffect } from "react";
import { useNavigationBar, useRouter } from "taro-hooks";
import "./areaDetail.less";
import queryOrganRoomById from "../../service/organ/queryOrganRoomById";
import Slider from "./Slider";
import { useCurrRoom } from "./useCurrRoom";
import AreaCard from "./AreaCard";
import Timetable from "./Timetable";

export default () => {
  const { store } = useCurrRoom();
  //标题
  const [routerInfo] = useRouter();
  useNavigationBar({ title: routerInfo.params.name });
  // request:请求area列表
  useLayoutEffect(() => {
    queryOrganRoomById(routerInfo.params?.id as string).then((res) => {
      store.rooms = res;
    });
  }, []);
  return (
    <>
      <AreaCard area={store.rooms[store.current]} />

      <Timetable area={store.rooms[store.current]} />
    </>
  );
};
