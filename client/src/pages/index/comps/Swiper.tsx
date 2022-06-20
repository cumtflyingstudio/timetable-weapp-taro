import { Image } from '@antmjs/vantui';
import { SwiperItem, Swiper as SwiperGroup } from '@tarojs/components';
import { FC } from '@tarojs/taro';

const Card: FC = (props) => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
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
        style={{ height: '200px' }}
      >
        <SwiperItem>
          {/* TODO:轮播图在这里修改*/}
          <Card>
            <Image
              style={{ width: '100%', height: '100%' }}
              src="https://a1.qpic.cn/psc?/V14UOnF12zsjiF/ruAMsa53pVQWN7FLK88i5hlrwP5g*LODV9zvsHxRTNRWzLw.FdAhPl3TtMJG02g5aylpX71hyRu.sJTafFrORNTe5IwqMZ.j3*jN9S7pwmw!/c&ek=1&kp=1&pt=0&bo=hAP0AYQD9AERECc!&t=5&tl=3&vuin=1730214056&tm=1635397200&sce=60-2-2&rf=0-0"
            />
          </Card>
        </SwiperItem>
        {/* <SwiperItem>
          <Card>2</Card>
        </SwiperItem>
        <SwiperItem>
          <Card>3</Card>
        </SwiperItem> */}
      </SwiperGroup>
    </div>
  );
};

export default Swiper;
