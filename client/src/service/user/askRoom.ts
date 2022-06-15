import sFetch from '../sFetch';

interface FormAskRoom {
  organizationId: string;
  usingId: string;
  num: 1;
  info: string;
  startTime: string; //"2022-04-05 00:10:32"
  endTime: string;
}

async function askRoom(form: FormAskRoom) {
  const message = await sFetch<string>({
    logTitle: '查看用户当前预约过的表单',
    method: 'POST',
    data: form,
    url: 'auth/find/applyinfo',
  });
  return message; //成功的提示语
}

export default askRoom;
