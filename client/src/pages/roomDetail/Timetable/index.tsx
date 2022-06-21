import { Empty } from '@antmjs/vantui';
import moment from 'moment';
import { FC, useEffect, useRef, useState } from 'react';
import { WeekSwiper } from '../../../components/WeekSwiper';
import queryRoomUsing from '../../../service/room/queryRoomUsing';
import TimePaintTable from './TimePaintTable';

const dateFormat = (time: Date = new Date()) => {
  return moment(time as any).format('yyyy-MM-DD');
};
const timeFormat = (time: Date = new Date()) => {
  return moment(time as any).format('YYYY-MM-DD HH:mm:ss');
};

type InferPromise<T> = T extends Promise<infer F> ? F : never;

const Timetable: FC<{ area: Room }> = (props) => {
  const { area = {} as Room } = props;
  const [timeStage, setTimeStage] = useState(
    [] as InferPromise<ReturnType<typeof queryRoomUsing>>,
  );
  const [currDate, setCurrDate] = useState(dateFormat());
  useEffect(() => {
    area.roomId &&
      queryRoomUsing(area?.roomId).then((res) => {
        setTimeStage(res);
      });
  }, [area?.roomId]);
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
