import sFetch from '../sFetch';

interface ReturnData {}

async function fetchModifyNickname(nickname: string) {
  const res = await sFetch<ReturnData>({
    logTitle: '修改昵称',
    url: '/api/auth/modify/nickname',
    method: 'POST',
    data: {
      nickname,
    },
    dataType: 'json',
  });

  return res;
}
export { fetchModifyNickname };
