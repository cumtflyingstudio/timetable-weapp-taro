import { useNavigationBar, useRouter } from 'taro-hooks';
import Taro, { Config } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import deviceImg from '../../assets/img/RoomOrDevice/device.png';
import roomImg from '../../assets/img/RoomOrDevice/room.png';
import './RoomOrDevice.less';

const navigateTo = (url) => Taro.redirectTo({ url });
const NavigatorCard = ({ title, imageUrl, url }) => {
  return (
    <div
      style={{
        background: 'white',
        width: '600rpx',
        height: '400rpx',
        margin: '40rpx',
        borderRadius: '60rpx',
        position: 'relative',
        boxShadow: '2px 2px 10px #bebebe',
      }}
      onClick={() => {
        navigateTo(url);
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 30,
          fontSize: '40rpx',
          fontWeight: 'bolder',
        }}
      >
        {title}
      </div>
      <Image
        src={imageUrl}
        style={{ width: '100%', height: '100%', borderRadius: '60rpx' }}
      />
    </div>
  );
};
const RoomOrDevice = () => {
  const [routerInfo] = useRouter();
  const { name, id } = routerInfo.params;
  useNavigationBar({ title: name });

  return (
    <div
      style={{
        width: '100vw',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <NavigatorCard
        title="租借场地"
        url={`/pages/roomDetail/roomDetail?name=${name}-租借场地&id=${id}`}
        imageUrl={roomImg}
      />
      {/* <NavigatorCard
        title="物品设备"
        url={`/pages/deviceDetail/deviceDetail?name=${name}-物品设备&id=${id}`}
        imageUrl={deviceImg}
      /> */}
    </div>
  );
};
export default RoomOrDevice;
