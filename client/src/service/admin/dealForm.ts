import Taro from '@tarojs/taro';
import sFetch from '../sFetch';
import type { IForm } from '../user/getRoomUsing';

interface IDealFormParams {
  applyId: string;
  status: number;
  dealInfo: string;
  kind: '设备' | '场地';
}
async function dealForm(params: IDealFormParams) {
  const { kind = '场地', ...otherParams } = params;
  const message = await sFetch<string>({
    logTitle: `管理员处理预约表单`,
    method: 'POST',
    url: kind === '设备' ? `auth/device/change` : `auth/room/change`,
    data: otherParams,
  });
  return message;
}

export default dealForm;
