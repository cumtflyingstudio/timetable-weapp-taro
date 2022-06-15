import Taro from '@tarojs/taro';
import URL from '../baseUrl';
import sFetch from '../sFetch';
import addTokenInterceptor from '../interceptors/addTokenInterceptor';

const loginURL = URL('api', 'auth/login');

interface ReturnData {
  loginAccount: string;
  token: string; //带Bearer前缀
  expirationTime: number;
}

async function login(username: string, password: string) {
  const res = await sFetch<ReturnData>({
    logTitle: '执行登录操作',
    url: loginURL,
    method: 'POST',
    data: {
      username,
      password,
    },
    dataType: 'json',
  });
  Taro.setStorageSync('token', res.token);
  Taro.setStorageSync('expirationTime', res.expirationTime);
  Taro.setStorageSync('username', username);
  return res;
}

export default login;
export { login, addTokenInterceptor };
