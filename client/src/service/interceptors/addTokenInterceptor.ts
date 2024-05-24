import Taro from '@tarojs/taro';

function addTokenInterceptor(token: string) {
  // @ts-ignore
  if (typeof token !== 'string' || token === '') {
    return;
  }
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
