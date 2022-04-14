import { FC } from "@tarojs/taro";
import { useRouter } from "taro-hooks";
import { Image } from "@antmjs/vantui";
import ApplicationField from "./ApplicationField";

const defaultApplicationAvatar = "http://p.qlogo.cn/gh/786079617/786079617/0";

//封装了自动跳转到organizationDetail页面，和image
const ApplicationItem: FC<{ applicationItem: Application }> = (props) => {
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
      <Image
        src={item?.avatar || defaultApplicationAvatar}
        style={{ flex: 1 }}
      />
    </ApplicationField>
  );
};
export default ApplicationItem;
