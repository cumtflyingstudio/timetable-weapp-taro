import sFetch from '../sFetch';

export interface TimeStage {
  reservationId: number;
  username: string;
  roomId: string;
  note: string;
  startTime: Date;
  endTime: Date;
  deleted: null;
  createTime: null;
}

async function queryRoomUsing(roomId: string): Promise<TimeStage[]> {
  const data = await sFetch<TimeStage[]>({
    logTitle: '查看某个教室使用情况',
    method: 'GET',
    url: `api/room/find/using?roomId=${roomId}`,
  });
  data.forEach((item) => {
    item.startTime = new Date(item.startTime);
    item.endTime = new Date(item.endTime);
  });
  return data;
}

export default queryRoomUsing;
