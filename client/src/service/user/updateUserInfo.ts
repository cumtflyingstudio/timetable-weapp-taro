import sFetch from '../sFetch';

type RequestBody = Partial<{
  nickname: string;
  phone: string;
}>;

interface ReturnData {}

async function fetchUpdateUserInfo(body: RequestBody) {
  const res = await sFetch<ReturnData>({
    logTitle: '修改昵称',
    url: '/api/auth/update/userinfo',
    method: 'POST',
    data: body,
    dataType: 'json',
  });

  return res;
}
export { fetchUpdateUserInfo };
