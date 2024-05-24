import Taro from '@tarojs/taro';
import sFetch from '../sFetch';

interface FormAskRoom {
  organizationId: number;
  resourceId: number;
  num: number;
  applyInfo: string;
  startTime: number; //"2022-04-05 00:10:32"
  endTime: number;
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
    logTitle: '预约一个场地/设备',
    method: 'POST',
    data: form,
    url: 'api/room/use/apply',
  });

  return innerData; //成功的提示语
}

export default askRoom;
