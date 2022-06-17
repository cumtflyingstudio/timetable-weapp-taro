import Taro from '@tarojs/taro';

function showToast(title: string) {
  Taro.showToast({
    title: title,
    icon: 'none',
    duration: 1000,
  });
}
export default showToast;
