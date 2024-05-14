import Taro from '@tarojs/taro';
import moment from 'moment';
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
    url: `api/auth/find/applyinfo?username=${name ?? ''}&current=${currPage ?? 1}&size=15`,
  });
  list.forEach((item) => {
    item.startTime = moment(item.startTime).toDate();
    item.endTime = moment(item.endTime).toDate();
    item.applyTime = moment(item.applyTime).toDate();
  });
  return list;
}

export default getMyForm;
