import { FC, memo } from "react";
import "./SliderItem.less";

interface ISliderItem {
  room: Room;
  selected?: boolean;
}

const SliderItem: FC<ISliderItem> = (props) => {
  const { room, selected = false } = props;
  return (
    <div
      style={{
        padding: 10,
        borderBottom: "1px solid #00000020",
        margin: "3px 0",
        background: "white",
        borderRadius: "4px",
        opacity: selected ? 0.5 : 1,
      }}
      className={selected ? "SliderItem selected" : "SliderItem"}
    >
      <div>{room.roomName}</div>
      <div>
        <span style={{ color: "gray" }}>{room.introduction}</span>
      </div>
    </div>
  );
};
export default memo(SliderItem);
