import { FC } from "@tarojs/taro";
import { Center } from "../../../../components/Stack";
import ApplicationField from "./ApplicationField";

const AddButton: FC<{}> = props => {
  const {} = props;
  return (
    <ApplicationField name={"添加组织"}>
      <Center
        style={{
          flex: 1,
          background: "transparent",
          border: "3px dashed gray",
          overflow: "hidden",
          opacity: 0.7,
          borderRadius: 20
        }}
        onTouchStart={() => {
          return;
        }}
      >
        <div
          style={{
            flex: 1,
            fontSize: 35,
            fontWeight: 500,
            lineHeight: "80%",
            textAlign: "center",
            color: "gray"
          }}
        >
          +
        </div>
      </Center>
    </ApplicationField>
  );
};
export default AddButton;
