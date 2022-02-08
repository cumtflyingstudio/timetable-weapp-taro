import { FC } from "@tarojs/taro";
const Stack: FC<IStackProp> = props => {
  const { children, style, ...otherProps } = props;
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "auto",
        minWidth: 20,
        minHeight: 20,
        justifyContent: "center",
        alignItems: "center",
        ...(style ?? {})
      }}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default Stack;
