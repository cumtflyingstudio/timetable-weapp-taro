import Taro from '@tarojs/taro';

function addTokenInterceptor(token) {
  const interceptor: Taro.interceptor = function (chain) {
    const requestParams = chain.requestParams;
    requestParams.header = {
      ...(requestParams.header ?? {}),
      Authorization: token,
    };
    return chain.proceed(requestParams).then((res) => {
      return res;
    });
  };
  Taro.addInterceptor(interceptor);
}
export default addTokenInterceptor;
