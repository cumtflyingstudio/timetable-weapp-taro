import Taro from '@tarojs/taro';
import moment from 'moment';
import sFetch from '../sFetch';

export interface IForm {
  kind: '场地' | '设备';

  organizationName: string;
  resourceName: string;

  num: number;
  note: string;
  status: 0 | 1 | 2 | 3;
  applyTime: Date;
  startTime: Date;
  endTime: Date;

  reservationId: number;
}

export function getStatus(status: number) {
  switch (status) {
    case 0:
      return { name: '被闲置', color: 'gray' };
    case 1:
      return { name: '待审核', color: 'orange' };
    case 2:
      return { name: '已通过', color: 'green' };
    case 3:
      return { name: '已拒绝', color: 'red' };
    default:
      return { name: '被闲置', color: 'gray' };
  }
}
export function getKind(kind: string) {
  switch (kind) {
    case '场地':
      return { name: '场地', color: 'skyblue' };
    case '设备':
      return { name: '设备', color: 'blue' };
    default:
      return { name: '被闲置', color: 'gray' };
  }
}

async function getRoomUsing(currPage: number) {
  const name = Taro.getStorageSync('username');
  const list = await sFetch<IForm[]>({
    logTitle: `查看用户提交过的预约 页数:${currPage}`,
    method: 'GET',
    url: `api/reservation/find?username=${name ?? ''}&current=${
      currPage ?? 1
    }&size=15`,
  });
  list.forEach((item) => {
    item.startTime = moment(item.startTime).toDate();
    item.endTime = moment(item.endTime).toDate();
    item.applyTime = moment(item.applyTime).toDate();
  });
  return list;
}

export default getRoomUsing;
