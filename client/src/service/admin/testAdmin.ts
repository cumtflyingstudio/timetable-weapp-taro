import baseUrl from '../baseUrl';
import sFetch from '../sFetch';

async function testAdmin() {
  const res = await sFetch({
    logTitle: '测试admin身份',
    url: baseUrl('api', 'admin'),
    method: 'GET',
  });
  //TODO:这里的判断是用中文的
  return typeof res === 'string' && res.includes('成功');
}

export default testAdmin;
