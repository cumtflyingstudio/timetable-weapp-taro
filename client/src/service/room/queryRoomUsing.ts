import sFetch from "../sFetch";
import baseUrl from "../baseUrl";

interface TimeStage {
  roomuseId: number;
  username: null;
  roomId: null;
  info: null;
  startTime: Date;
  endTime: Date;
  deleted: null;
  createTime: null;
}

async function queryRoomUsing(roomId: string) {
  const data = await sFetch<TimeStage[]>({
    logTitle: "查看某个教室使用情况",
    method: "GET",
    url: baseUrl("room", "find/using") + `?roomId=${roomId}`,
  });
  data.forEach((item) => {
    item.startTime = new Date(item.startTime);
    item.endTime = new Date(item.endTime);
  });
  return data;
}

export default queryRoomUsing;
