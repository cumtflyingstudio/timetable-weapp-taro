import Taro from '@tarojs/taro';
import usePiniadux from '../../piniadux/src/hooks/usePiniadux';

const currRoom = Symbol('currRoom');
export const useAvatar = () => {
  return usePiniadux(currRoom, {
    state() {
      const avatarUrl = Taro.getStorageSync('avatarUrl') || '';
      return {
        avatarUrl,
      };
    },
  });
};
