import baseUrl from '../baseUrl';
import sFetch from '../sFetch';

// interface IAdmin {
//   createTime: null;
//   deleted: number;
//   roleId: number;
//   roleMark: string;
//   roleName: string;
// }
async function testAdmin() {
  const res = (await sFetch({
    logTitle: '测试admin身份',
    url: 'api/auth/get/admin',
    method: 'GET',
  })) as string[];
  //TODO:这里的判断是用中文的
  return res;
}

export default testAdmin;
