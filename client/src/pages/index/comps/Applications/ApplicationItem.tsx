import { FC } from "@tarojs/taro";
import { useRouter } from "taro-hooks";
import ApplicationField from "./ApplicationField";
import { Image } from "@antmjs/vantui";
//封装了自动跳转到areaDetail页面，和image
const ApplicationItem: FC<{ applicationItem: Application }> = props => {
  const { applicationItem: item } = props;
  const [_, { navigateTo }] = useRouter();

  return (
    <ApplicationField
      name={item.name}
      onOpen={() => {
        navigateTo(
          `/pages/areaDetail/areaDetail?name=${item.name}&id=${item._id}`
        );
      }}
    >
      <Image src={item.avatar} style={{ flex: 1 }} />
    </ApplicationField>
  );
};
export default ApplicationItem;
