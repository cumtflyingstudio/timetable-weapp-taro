import Taro from '@tarojs/taro';
import { useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { useImmer } from 'use-immer';
import addTokenInterceptor from '../service/interceptors/addTokenInterceptor';
import { useRequest } from 'taro-hooks';
import getUserInfo from '../service/user/getUserInfo';

function useUserInfo() {
  const [userInfo, setUserInfo] = useImmer({
    username: '',
    phone: '',
    nickname: '',
    introduction: '',
    avatar: '',
  });

  let token = Taro.getStorageSync('token');
  useEffect(() => {
    if (token) {
      addTokenInterceptor(token);
    }
  }, [token]);

  const { data, loading, error } = useRequest(getUserInfo, {
    ready: token,
  });
  useEffect(() => {
    if (!(loading || error) && data) {
      setUserInfo((draft) => {
        draft.username = data?.username ?? '';
        draft.nickname = data?.nickname ?? '';
        draft.phone = data?.phone ?? '';
        draft.introduction = data?.introduction ?? '';
      });
    }
  }, [data]);

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
