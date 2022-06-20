import sFetch from '../sFetch';
import baseUrl from '../baseUrl';

export interface IDevice {
  deviceId: string;
  deviceName: string;
  total: number;
  usingNum: number;
}

async function getAllDevice(organId: string) {
  const data = await sFetch<IDevice[]>({
    logTitle: '查看某个教室使用情况',
    method: 'GET',
    url: `device/find/all?organId=${organId}`,
  });

  return data;
}

export default getAllDevice;
