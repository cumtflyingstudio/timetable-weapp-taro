import { FC } from "@tarojs/taro";
import Stack from "./Stack";

const VStack: FC<IStackProp> = props => {
  const { style, ...otherProps } = props;
  return (
    <Stack
      {...otherProps}
      style={{ ...style, flexDirection: "column" }}
    ></Stack>
  );
};

export default VStack;
