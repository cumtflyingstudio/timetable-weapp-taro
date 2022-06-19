import Taro from '@tarojs/taro';
import sFetch from '../sFetch';

import type { IForm } from '../user/getRoomUsing';

async function getRoomForm(currPage: number) {
  const name = Taro.getStorageSync('username');
  const list = await sFetch<IForm[]>({
    logTitle: `查看用户当前预约过的表单 页数:${currPage}`,
    method: 'GET',
    url: `manager/find/applyinfo?username=${name}&current=${currPage}&size=15`,
  });
  list.forEach((item) => {
    item.id = (Math.random() * 100000) | 0;
  });
  return list;
}

export default getRoomForm;
