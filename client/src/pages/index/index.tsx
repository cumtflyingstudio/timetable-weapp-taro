import Applications from "./comps/Applications/index";
import Swiper from "./comps/Swiper";
import "./index.less";
const hello = "hello";

export default () => {
  return (
    <>
      <div style={{ height: "200rpx", width: "100%" }}></div>
      <Swiper />
      <Applications
        applicationList={new Array(6).fill({ name: hello, avatar: hello })}
      />
    </>
  );
};
