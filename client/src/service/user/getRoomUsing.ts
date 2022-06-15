import Taro from '@tarojs/taro';
import sFetch from '../sFetch';

export interface IForm {
  organizationName: string;
  rentName: string;
  num: number;
  applyInfo: string;
  status: null;
  applyTime: null;
  startTime: Date;
  endTime: Date;
  id: number;
}

async function getRoomUsing(currPage: number) {
  const name = Taro.getStorageSync('username');
  const list = await sFetch<IForm[]>({
    logTitle: '查看用户当前预约过的表单',
    method: 'GET',
    url: `auth/find/applyinfo?username=${name}&current=${currPage}&size=10`,
  });
  list.forEach((item) => {
    item.id = (Math.random() * 1000) | 0;
  });
  return list;
}

export default getRoomUsing;
