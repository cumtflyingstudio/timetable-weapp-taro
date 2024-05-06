import Taro from '@tarojs/taro';
import URL from '../baseUrl';
import sFetch from '../sFetch';
import addTokenInterceptor from '../interceptors/addTokenInterceptor';

const loginURL = URL('api', 'auth/login');

interface ReturnData {
  token: string; //带Bearer前缀
}

async function fetchLogin(username: string, password: string) {
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
  Taro.setStorageSync('username', username);
  return res;
}

export { fetchLogin, addTokenInterceptor };
