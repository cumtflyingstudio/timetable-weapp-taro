import { FC } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "taro-hooks";
import { Center, VStack } from "../../../../components/Stack";

interface IApplicationFieldProps {
  name: string;
  onOpen?: () => void;
}
const ApplicationField: FC<IApplicationFieldProps> = props => {
  const { name, onOpen } = props;
  const [active, setActive] = useState(false);
  const timeout = useRef(Promise.resolve());

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
        onTouchStart={e => {
          setActive(true);

          timeout.current = new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, 200);
          });
        }}
        onTouchCancel={e => {
          timeout.current.then(() => {
            setActive(false);
          });
        }}
        onTouchEnd={e => {
          timeout.current.then(() => {
            setActive(false);
            onOpen?.();
          });
        }}
      >
        <div
          style={{
            width: "150rpx",
            height: "150rpx",
            display: "flex",
            borderRadius: 20,
            overflow: "hidden"
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
      </VStack>
    </Center>
  );
};

export default ApplicationField;
