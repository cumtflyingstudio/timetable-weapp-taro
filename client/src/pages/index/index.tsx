import Applications from "./comps/Applications/index";
import Swiper from "./comps/Swiper";
import "./index.less";
import Taro from "@tarojs/taro";
import { context, useListReducer } from "./context";

export default () => {
  const [state, dispatch] = useListReducer();

  return (
    <>
      <context.Provider value={{ state, dispatch }}>
        <div style={{ height: "200rpx", width: "100%" }}></div>
        <Swiper />
        <Applications applicationList={state.applicationList_added} />
      </context.Provider>
    </>
  );
};
