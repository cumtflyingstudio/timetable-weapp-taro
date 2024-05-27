import moment from 'moment';
import sFetch from '../sFetch';

interface Detail {
  reservationId: number;
  username: string;
  nickname: string;
  phone: string;
  introduction: string;
  status: number;
  startTime: Date;
  endTime: Date;
  roomName: string;
  roomId: string;
  note: string;
}

async function getReservationDetail(id: number): Promise<Detail> {
  const item = (await sFetch({
    logTitle: `查看某个预约详情 id:${id}`,
    method: 'GET',
    url: `api/reservation/detail?reservationId=${id}`,
  })) as any;

  item.startTime = moment(item.startTime).toDate();
  item.endTime = moment(item.endTime).toDate();

  return item as any;
}

export { getReservationDetail };
