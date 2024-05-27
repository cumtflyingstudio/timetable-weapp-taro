import Taro from '@tarojs/taro';
import { useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { useImmer } from 'use-immer';
import addTokenInterceptor from '../service/interceptors/addTokenInterceptor';

function useUserInfo() {
  const [userInfo, setUserInfo] = useImmer({
    username: '',
    phone: '',
    nickname: '',
    introduction: '',
    avatar: '',
  });

  useEffect(() => {
    let token = Taro.getStorageSync('token');
    if (token) {
      addTokenInterceptor(token);
    }
  }, []);

  return { userInfo, setUserInfo };
}

const UserInfoContainer = createContainer(useUserInfo);

const useGlobalUserInfo = UserInfoContainer.useContainer;

function useAvatar() {
  const { userInfo, setUserInfo } = useGlobalUserInfo();
  useEffect(() => {
    setUserInfo((draft) => {
      draft.avatar = Taro.getStorageSync('avatarUrl') || '';
    });
  }, []);
  return userInfo.avatar;
}

export { useGlobalUserInfo, UserInfoContainer, useAvatar };
