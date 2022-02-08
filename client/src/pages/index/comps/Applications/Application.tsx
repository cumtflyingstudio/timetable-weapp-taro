import { FC } from "@tarojs/taro";
import ApplicationField from "./ApplicationField";

const Application: FC<{ applicationItem: Application }> = props => {
  const { applicationItem: item } = props;
  return (
    <ApplicationField name={item.name}>
      <div style={{ flex: 1, background: "lightYellow" }}></div>
    </ApplicationField>
  );
};
export default Application;
