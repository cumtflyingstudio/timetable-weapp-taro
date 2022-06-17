import Taro from '@tarojs/taro';
import { baseUrl } from './baseUrl';

//返回最里层的data
async function sFetch<T>(option: Taro.request.Option & { logTitle: string }) {
  const { logTitle, ...taroOption } = option;
  if (!taroOption.url.includes('http')) {
    taroOption.url = baseUrl + taroOption.url;
  }
  const { data, statusCode, errMsg } = await Taro.request(taroOption);

  if (statusCode !== 200 || data?.code !== 200) {
    console.log(
      `%c${logTitle} request ${option.url.replace(baseUrl, '')}  网络发生错误`,
      'color: white; font-size: 10px; background: red',
      errMsg,
      data,
      option?.data || undefined,
    );
    throw new Error(data?.message ?? '网络发生错误');
  }

  const { data: innerData, code, message } = data;
  if (code === undefined) {
    return data as T;
  }
  //print success message here
  console.log(
    `%c${logTitle} request`,
    'color: white; font-size: 10px; background: green',
    data,
    (option.method === 'POST' && option.data) || undefined,
  );
  if (code === 200) {
    return innerData as T;
  } else {
    throw new Error(message);
  }
}

export default sFetch;
