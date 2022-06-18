import { Empty } from '@antmjs/vantui';
import Taro from '@tarojs/taro';
import showToast from '../utils/showToast';
import { baseUrl } from './baseUrl';

const interceptor: Taro.interceptor = function (chain) {
  const requestParams = chain.requestParams;

  return chain
    .proceed(requestParams)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      if (e.message?.includes?.('request'))
        return {
          data: {},
          statusCode: 400,
          errMsg: '请检查本地联网情况',
        };
      else {
        return {
          data: {},
          statusCode: 400,
          errMsg: e.message,
        };
      }
    });
};
Taro.addInterceptor(interceptor);
//返回最里层的data
async function sFetch<T>(
  option: Taro.request.Option & { logTitle: string; showError?: boolean },
) {
  const { logTitle, showError = true, ...taroOption } = option;
  if (!taroOption.url.includes('http')) {
    taroOption.url = baseUrl + taroOption.url;
  }

  const {
    data = {},
    statusCode = 400,
    errMsg = '网络错误',
  } = await Taro.request(taroOption);
  // print error message on console
  function errorLog() {
    console.log(
      `%c${logTitle} ${option.method} ${option.url.replace(baseUrl, '')}`,
      'color: white; font-size: 10px; background: red',
      errMsg,
      data,
      option?.data || undefined,
    );
  }
  // print request fail message here
  if (statusCode !== 200) {
    errorLog();
    if (showError) {
      showToast(data?.message ?? '网络发生错误');
      throw new Error(data?.message ?? '网络发生错误');
    } else {
      throw new Error(data?.message ?? '网络发生错误');
    }
  }

  const { data: innerData, code, message } = data;
  // print server error message here
  if (code !== 200) {
    errorLog();
    if (typeof innerData === 'string') {
      throw new Error(innerData);
    }
    throw new Error(message ?? '网络发生错误');
  }
  //print success message here
  if (code === 200) {
    console.log(
      `%c${logTitle} ${option.method}`,
      'color: white; font-size: 10px; background: green',
      data,
      (option.method === 'POST' && option.data) || void 0,
    );
    return innerData as T;
  } else {
    throw new Error(message);
  }
}

export default sFetch;
