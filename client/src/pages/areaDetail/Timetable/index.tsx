import { FC, useEffect, useRef, useState } from "react";
import { WeekSwiper } from "../../../components/WeekSwiper";
import queryRoomUsing from "../../../service/room/queryRoomUsing";
// eslint-disable-next-line import/first
import moment from "moment";

const dateFormat = (time: Date = new Date()) => {
  return moment(time).format("yyyy-MM-DD");
};
const timeFormat = (time: Date = new Date()) => {
  return moment(time).format("YYYY-MM-DD HH:mm:ss");
};

type InferPromise<T> = T extends Promise<infer F> ? F : never;

const Timetable: FC<{ area: Room }> = (props) => {
  const { area = {} as Room } = props;
  const [timeStage, setTimeStage] = useState(
    [] as InferPromise<ReturnType<typeof queryRoomUsing>>
  );
  const [currDate, setCurrDate] = useState(dateFormat());
  useEffect(() => {
    area.roomId &&
      queryRoomUsing(area?.roomId).then((res) => {
        setTimeStage(res);
      });
  }, [area?.roomId]);

  return (
    <div>
      <WeekSwiper
        onChange={(e) => {
          setCurrDate(e);
        }}
      />
      <div>
        {timeStage
          .filter((item) => {
            return (
              currDate >= dateFormat(item.startTime) &&
              currDate <= dateFormat(item.endTime)
            );
          })
          .map((item) => {
            return (
              <div key={item.roomId}>
                {timeFormat(item.startTime)} - {timeFormat(item.endTime)}
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Timetable;
