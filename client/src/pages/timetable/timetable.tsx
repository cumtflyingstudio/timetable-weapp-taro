import Taro, { Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./timetable.less";

export default () => {
  return (
    <View className="timetable">
      <div
        style={{ height: "200rpx", width: "200rpx", backgroundColor: "pink" }}
      ></div>
    </View>
  );
};
