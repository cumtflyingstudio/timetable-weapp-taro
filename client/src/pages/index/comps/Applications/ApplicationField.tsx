import { FC } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "taro-hooks";
import { Center, VStack } from "../../../../components/Stack";
import TouchableOpacity from "../../../../components/TouchableOpacity";

//用于装一个app图标的盒子，name名称
interface IApplicationFieldProps {
  name: string;
  onOpen?: () => void;
}

const ApplicationField: FC<IApplicationFieldProps> = (props) => {
  const { name, onOpen } = props;
  return (
    <Center
      style={{
        minWidth: 0,
        minHeight: 0,
        width: "50%",
        flex: 0,
        display: "flex",
      }}
    >
      <TouchableOpacity
        style={{
          padding: 5,
          borderRadius: 20,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        onClick={onOpen}
      >
        <div
          style={{
            width: "150rpx",
            height: "150rpx",
            display: "flex",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {props.children}
        </div>
        {name ?? (
          <div>
            <span style={{ color: "gray", fontWeight: 900, fontSize: 20 }}>
              {name}
            </span>
          </div>
        )}
      </TouchableOpacity>
    </Center>
  );
};

export default ApplicationField;
