import { Dialog, Empty } from '@antmjs/vantui';
import { FC, useCallback, useState } from 'react';
import { useRequest } from 'taro-hooks';
import { WeekSwiper } from '../../../components/WeekSwiper';
import queryRoomUsing, {
  type TimeStage,
} from '../../../service/room/queryRoomUsing';
import momentFormat from '../../../utils/momentFormat';
import TimePaintTable from './TimePaintTable';
import { getReservationDetail } from '../../../service/reservation/getReservationDetail';

const dateFormat = (time: Date = new Date()) => {
  return momentFormat(time, 'YYYY-MM-DD');
};

const Timetable: FC<{ area: Room }> = (props) => {
  const { area = {} as Room } = props;
  const [currDate, setCurrDate] = useState(dateFormat());

  const {
    data: timeStage = [],
    loading,
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
    getReservationDetail(item.reservationId).then(({ phone, nickname }) => {
      Dialog.alert({
        id: 'reservationDetail',
        title: item.note,
        message: `预约人昵称: ${nickname}\n预约人联系方式:${phone ?? '无'}\n开始时间:${momentFormat(
          item.startTime,
          'HH:mm',
        )}\n结束时间:${momentFormat(item.endTime, 'HH:mm')}`,
      });
    });
  }, []);

  // useRequest()

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
      <Dialog overlay closeOnClickOverlay id="reservationDetail"></Dialog>
    </div>
  );
};
export default Timetable;
