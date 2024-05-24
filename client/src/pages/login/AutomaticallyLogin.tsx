import Taro, { showToast } from '@tarojs/taro';
import addTokenInterceptor from '../../service/interceptors/addTokenInterceptor';

const Router = () => {
  let token = Taro.getStorageSync('token');

  if (token) {
    addTokenInterceptor(token);
    Taro.switchTab({
      url: '/pages/index/index',
    })
      .then(() => {
        showToast({
          title: '自动登录成功',
          icon: 'success',
          duration: 2000,
        }).then(() => {});
      })
      .catch((err) => {
        showToast({
          title: '登录身份已过期',
          icon: 'success',
          duration: 2000,
        }).then(() => {});
      });
  }
  return <></>;
};

export { Router };
