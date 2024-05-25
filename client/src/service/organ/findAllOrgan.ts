import URL from '../baseUrl';
import sFetch from '../sFetch';

const defaultApplicationAvatar = 'http://p.qlogo.cn/gh/786079617/786079617/0';

//获得所有组织
async function findAllOrgan() {
  const data = await sFetch<Organ[]>({
    logTitle: '查询所有组织',
    url: URL('api', 'organ/find/all'),
    method: 'GET',
  });
  data.forEach((i) => {
    i.avatar = i.avatar ?? defaultApplicationAvatar;
  });

  return data;
}

export default findAllOrgan;
