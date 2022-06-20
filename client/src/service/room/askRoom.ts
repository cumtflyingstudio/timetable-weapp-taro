import Taro from '@tarojs/taro';
import sFetch from '../sFetch';

interface FormAskRoom {
  organizationId: string;
  usingId: string;
  num: number;
  applyInfo: string;
  startTime: string; //"2022-04-05 00:10:32"
  endTime: string;
}

async function askRoom(form: FormAskRoom) {
  //case1 不能为空
  for (let key in form) {
    if (form[key] === '' || form[key] === null || form[key] === void 0) {
      throw new Error('有必填项为空');
    }
  }
  //case2 开始时间必须小于结束时间
  if (form.startTime >= form.endTime) {
    throw new Error('开始时间必须小于结束时间');
  }

  const innerData = await sFetch<string>({
    logTitle: '预约一个教室/房间',
    method: 'POST',
    data: form,
    url: 'room/use/apply',
  });

  return innerData; //成功的提示语
}

export default askRoom;
