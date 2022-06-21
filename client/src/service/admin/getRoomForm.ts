import Taro from '@tarojs/taro';
import moment from 'moment';
import sFetch from '../sFetch';

import type { IForm } from '../user/getMyForm';

async function getRoomForm(currPage: number) {
  const list = await sFetch<IForm[]>({
    logTitle: `查看管理员可以处理的预约表单 页数:${currPage}`,
    method: 'GET',
    url: `manager/find/applyinfo?current=${currPage}&size=15`,
  });
  list.forEach((item) => {
    item.startTime = moment(item.startTime).toDate();
    item.applyTime = moment(item.applyTime).toDate();
    item.endTime = moment(item.endTime).toDate();
  });
  return list;
}

export default getRoomForm;
