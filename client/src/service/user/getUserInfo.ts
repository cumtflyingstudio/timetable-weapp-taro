import Taro from '@tarojs/taro';
import sFetch from '../sFetch';

export interface IUserInfo {
  userId: string;
  username: string;
  // password: string;
  nickname: string;
  // deleted: number;
  phone: string;
  introduction: string,

  createTime: Date;
}

async function getUserInfo() {
  const name = Taro.getStorageSync('username');
  const user = await sFetch<IUserInfo>({
    logTitle: '请求用户信息',
    method: 'GET',
    url: `api/auth/find/userinfo?username=${name}`,
  });
  return user;
}

export default getUserInfo;
