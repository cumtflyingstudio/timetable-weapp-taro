import Taro, { Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./timetable.less";
import { Calendar } from "@antmjs/vantui";

export default () => {
  return (
    <>
      <div style={{ margin: 10 }}>
        <div
          style={{
            height: "200rpx",
            backgroundColor: "pink",
            borderRadius: 20,
            display: "flex"
          }}
        ></div>
      </div>
      <Calendar
        title="日历"
        poppable={false}
        showConfirm={false}
        style={{ flex: 1 }}
      />
    </>
  );
};
