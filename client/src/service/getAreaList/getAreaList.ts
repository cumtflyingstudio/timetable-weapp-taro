import Taro from "@tarojs/taro";
import list from "./fake";
function getAreaList(id: string) {
  return Taro.cloud
    .callFunction({
      name: "getAreaList",
      data: {
        id: id
      }
    })
    .then(res => {
      return (res.result as any).data as IArea[];
    });
}
export default getAreaList;
