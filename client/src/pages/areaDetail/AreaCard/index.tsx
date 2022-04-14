import { FC } from "react";
import Slider from "../Slider";

const initialObj = {
  roomId: "",
  organizationId: null,
  roomName: "",
  leader: "",
  introduction: "",
  deleted: null,
  createTime: null,
};

const AreaCard: FC<{ area: Room }> = (props) => {
  const { area = initialObj } = props;
  return (
    <div style={{ display: "flex",justifyContent:"space-between" }}>
      <Slider />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>{area.roomName} - {area.leader}</div>
      </div>
    </div>
  );
};
export default AreaCard;
