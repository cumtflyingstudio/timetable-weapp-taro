import { FC } from "@tarojs/taro";
import { useRouter } from "taro-hooks";
import ApplicationField from "./ApplicationField";

const Application: FC<{ applicationItem: Application }> = props => {
  const { applicationItem: item } = props;
  const [routeInfo, { navigateTo }] = useRouter();

  return (
    <ApplicationField name={item.name}>
      <div
        style={{ flex: 1, background: "lightYellow" }}
        onTouchStart={() => {
          navigateTo("/pages/areaDetail/areaDetail");
        }}
      ></div>
    </ApplicationField>
  );
};
export default Application;
