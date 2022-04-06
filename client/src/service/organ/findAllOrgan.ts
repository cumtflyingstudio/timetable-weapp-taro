import URL from "../baseUrl";
import sFetch from "../sFetch";

//获得所有组织
async function findAllOrgan() {
  const data = await sFetch<Organ[]>({
    logTitle: "查询所有组织",
    url: URL("organ", "find/all"),
    method: "GET",
  });

  return data;
}

export default findAllOrgan;
