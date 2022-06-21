import sFetch from '../sFetch';

export interface IDevice {
  deviceId: string;
  deviceName: string;
  total: number;
  usingNum: number;
}

async function getAllDevice(organId: string) {
  const data = await sFetch<IDevice[]>({
    logTitle: '获取组织的所有设备',
    method: 'GET',
    url: `device/find/all?organId=${organId}`,
  });

  return data;
}

export default getAllDevice;
