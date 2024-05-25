import { Empty } from '@antmjs/vantui';
import { FC, useState } from 'react';
import { useRequest } from 'taro-hooks';
import { WeekSwiper } from '../../../components/WeekSwiper';
import queryRoomUsing from '../../../service/room/queryRoomUsing';
import momentFormat from '../../../utils/momentFormat';
import TimePaintTable from './TimePaintTable';

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
    return (
      currDate >= dateFormat(item.startTime) &&
      currDate <= dateFormat(item.endTime)
    );
  });
  return (
    <div>
      <WeekSwiper
        onChange={(e) => {
          setCurrDate(e);
        }}
      />
      <div>
        {filteredList.length !== 0 ? (
          <TimePaintTable list={filteredList}></TimePaintTable>
        ) : null}
      </div>
      <div>
        {filteredList.length === 0 && <Empty description="本日无人预约" />}
      </div>
    </div>
  );
};
export default Timetable;
