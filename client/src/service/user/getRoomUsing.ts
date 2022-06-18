import Taro from '@tarojs/taro';
import sFetch from '../sFetch';

export interface IForm {
  organizationName: string;
  kind: '教室' | '设备' | '其他';
  rentName: string;
  num: number;
  applyInfo: string;
  status: 0 | 1 | 2;
  applyTime: Date;
  startTime: Date;
  endTime: Date;
  id: number;
}

async function getRoomUsing(currPage: number) {
  const name = Taro.getStorageSync('username');
  const list = await sFetch<IForm[]>({
    logTitle: `查看用户当前预约过的表单 页数:${currPage}`,
    method: 'GET',
    url: `auth/find/applyinfo?username=${name}&current=${currPage}&size=15`,
  });
  list.forEach((item) => {
    item.id = (Math.random() * 100000) | 0;
  });
  return list;
}

export default getRoomUsing;
