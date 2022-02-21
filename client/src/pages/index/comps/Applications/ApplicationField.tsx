import { FC } from "@tarojs/taro";
import { useRef, useState } from "react";
import { useRouter } from "taro-hooks";
import { Center, VStack } from "../../../../components/Stack";

const ApplicationField: FC<{ name?: string }> = props => {
  const { name } = props;
  const [active, setActive] = useState(false);
  const timeout = useRef<null | object>({});
  return (
    <Center
      style={{
        minWidth: 0,
        minHeight: 0,
        width: "50%",
        flex: 0,
        display: "flex"
      }}
    >
      <VStack
        style={{
          padding: 5,
          opacity: active ? 0.3 : 1,
          borderRadius: 20,
          overflow: "hidden"
        }}
        onTouchStart={() => {
          setActive(true);
          timeout.current = setTimeout(() => {
            timeout.current = null;
            // navigateTo("/pages/areaDetail/areaDetail");
          }, 300);
        }}
        onTouchEnd={() => {
          if (timeout.current !== null) {
            setTimeout(() => {
              setActive(false);
            }, 200);
            return;
          } else {
            setActive(false);
          }
        }}
      >
        <div
          style={{
            width: "150rpx",
            height: "150rpx",
            // border: "1px solid black",
            display: "flex",
            borderRadius: 20,
            overflow: "hidden"
          }}
        >
          {props.children}
        </div>
        {name ?? <div style={{ color: "gray" }}>{name}</div>}
      </VStack>
    </Center>
  );
};

export default ApplicationField;
