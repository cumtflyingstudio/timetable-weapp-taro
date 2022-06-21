import Taro from '@tarojs/taro';
import sFetch from '../sFetch';

export interface IForm {
  organizationName: string;
  kind: '教室' | '设备';
  rentName: string;
  num: number;
  applyInfo: string;
  status: 0 | 1 | 2;
  applyTime: Date;
  startTime: Date;
  endTime: Date;
  dealInfo: string | null;
  applyId: string;
}

async function getMyForm(currPage: number) {
  const name = Taro.getStorageSync('username');
  const list = await sFetch<IForm[]>({
    logTitle: `查看用户当前预约过的表单 页数:${currPage}`,
    method: 'GET',
    url: `auth/find/applyinfo?username=${name}&current=${currPage}&size=15`,
  });
  list.forEach((item) => {
    // item.id = item?.id ?? (Math.random() * 100000) | 0;
    item.endTime = new Date(item.endTime);
    item.startTime = new Date(item.startTime);
    item.applyTime = new Date(item.applyTime);
  });
  return list;
}

export default getMyForm;
