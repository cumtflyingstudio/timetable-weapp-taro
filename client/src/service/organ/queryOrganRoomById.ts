import sFetch from "../sFetch";
import baseUrl from "../baseUrl";

async function queryOrganRoomById() {
  const data = await sFetch({
    logTitle: "根据组织id查询拥有的场地",
    method: "GET",
    url: baseUrl("room", "find/all"),
  });
  return data;
}

export default queryOrganRoomById;
