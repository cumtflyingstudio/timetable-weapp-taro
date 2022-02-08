import { SwiperItem, Swiper as SwiperGroup } from "@tarojs/components";
import { FC } from "@tarojs/taro";

const Card: FC = props => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div className="shadow" style={{ flex: 1, margin: 20, marginTop: 0 }}>
        {props.children}
      </div>
    </div>
  );
};
const Swiper = () => {
  return (
    <div>
      <SwiperGroup
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
        style={{ height: "200px" }}
      >
        <SwiperItem>
          <Card>1</Card>
        </SwiperItem>
        <SwiperItem>
          <Card>2</Card>
        </SwiperItem>
        <SwiperItem>
          <Card>3</Card>
        </SwiperItem>
      </SwiperGroup>
    </div>
  );
};

export default Swiper;
