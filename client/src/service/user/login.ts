import Taro from '@tarojs/taro';
import URL, { createUrl } from '../baseUrl';
import sFetch from '../sFetch';
import addTokenInterceptor from '../interceptors/addTokenInterceptor';

interface ReturnData {
  token: string; //带Bearer前缀
}

async function fetchLogin(username: string, password: string) {
  const res = await sFetch<ReturnData>({
    logTitle: '执行登录操作',
    url: createUrl('/api/auth/login'),
    method: 'POST',
    data: {
      username,
      password,
    },
    dataType: 'json',
  });

  addTokenInterceptor(res.token);
  Taro.setStorageSync('token', res.token);
  Taro.setStorageSync('username', username);
  return res;
}

interface WxLoginReturnData {
  username: string;
  token: string;
}

async function fetchWxLogin(js_code: string) {
  const { token, username } = await sFetch<WxLoginReturnData>({
    logTitle: '执行微信登录操作',
    url: createUrl(`/api/auth/wxlogin?js_code=${js_code}`),
    method: 'POST',
    data: {},
    dataType: 'json',
  });
  addTokenInterceptor(token);
  Taro.setStorageSync('token', token);
  Taro.setStorageSync('username', username);
  return {};
}

export { fetchLogin, fetchWxLogin, addTokenInterceptor };
