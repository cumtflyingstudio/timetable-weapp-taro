import sFetch from "../sFetch";
import baseUrl from "../baseUrl";

async function queryRoomUsing(roomId: string) {
  const data = await sFetch<Room[]>({
    logTitle: "查看某个教室使用情况",
    method: "GET",
    url: baseUrl("room", "find/using") + `?roomId=${roomId}`,
  });
  return data;
}

export default queryRoomUsing;
