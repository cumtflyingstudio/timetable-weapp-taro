import { FC } from "react";
import { WeekSwiper } from "../../../components/WeekSwiper";

const Timetable: FC<{ area: Room }> = (props) => {
  return (
    <div>
      <WeekSwiper />
    </div>
  );
};
export default Timetable;
