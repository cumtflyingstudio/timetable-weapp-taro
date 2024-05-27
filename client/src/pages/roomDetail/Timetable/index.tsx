import { Dialog, Empty } from '@antmjs/vantui';
import { FC, memo, useCallback, useState } from 'react';
import { useRequest } from 'taro-hooks';
import { WeekSwiper } from '../../../components/WeekSwiper';
import queryRoomUsing, {
  type TimeStage,
} from '../../../service/room/queryRoomUsing';
import momentFormat from '../../../utils/momentFormat';
import TimePaintTable from './TimePaintTable';
import { getReservationDetail } from '../../../service/reservation/getReservationDetail';
import type { IForm } from '../../../service/user/getRoomUsing';
import Taro from '@tarojs/taro';

const dateFormat = (time: Date = new Date()) => {
  return momentFormat(time, 'YYYY-MM-DD');
};

const Timetable: FC<{ area: Room }> = memo((props) => {
  const { area = {} as Room } = props;
  const [currDate, setCurrDate] = useState(dateFormat());

  const {
    data: timeStage = [],
    loading,
    refresh,
    error,
  } = useRequest(
    () => {
      return queryRoomUsing(area?.roomId).then((res) => {
        return res;
      });
    },
    {
      ready: Boolean(area?.roomId),
      refreshDeps: [area?.roomId],
    },
  );

  const filteredList = timeStage.filter((item) => {
    // 筛选当日的预约
    return (
      currDate >= dateFormat(item.startTime) &&
      currDate <= dateFormat(item.endTime)
    );
  });

  const handleTimeStageClick = useCallback((item: TimeStage) => {
    Taro.navigateTo({
      url: `/pages/timetableDetail/timetableDetail?reservationId=${item.reservationId}`,
    });
  }, []);

  return (
    <div>
      <WeekSwiper
        onChange={(e) => {
          setCurrDate(e);
        }}
      />
      <div>
        {filteredList.length === 0 ? (
          <Empty description="本日无人预约" />
        ) : (
          <TimePaintTable list={filteredList} onClick={handleTimeStageClick} />
        )}
      </div>
    </div>
  );
});
export default Timetable;
