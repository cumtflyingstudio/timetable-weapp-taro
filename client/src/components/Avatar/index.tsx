import { OpenData } from "@tarojs/components";
import { FC } from "@tarojs/taro";
import React from "react";

interface IAvatarProps {
  /**
   * @description rpx
   */
  size: number;
}
const Avatar: FC<IAvatarProps> = props => {
  const { size = 200 } = props;
  return (
    <div
      style={{
        width: `${size}rpx`,
        height: `${size}rpx`,
        borderRadius: 2000,
        overflow: "hidden"
      }}
    >
      <OpenData type="userAvatarUrl" />
    </div>
  );
};
export default Avatar;
