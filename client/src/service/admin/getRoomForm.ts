import Taro from '@tarojs/taro';
import sFetch from '../sFetch';

import type { IForm } from '../user/getMyForm';

async function getRoomForm(currPage: number) {
  const list = await sFetch<IForm[]>({
    logTitle: `查看管理员可以处理的预约表单 页数:${currPage}`,
    method: 'GET',
    url: `manager/find/applyinfo?current=${currPage}&size=15`,
  });
  list.forEach((item) => {
    item.id = item?.id ?? (Math.random() * 100000) | 0;
  });
  return list;
}

export default getRoomForm;
