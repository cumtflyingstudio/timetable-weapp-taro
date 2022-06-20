import Taro, { Config } from '@tarojs/taro';
import { useNavigationBar, useRequest, useRouter } from 'taro-hooks';
import { useState } from 'react';
import { Empty, Search } from '@antmjs/vantui';
import { View, Text } from '@tarojs/components';
import './deviceDetail.less';
import getAllDevice from '../../service/device/getAllDevice';
import DeviceShowCard from './comps/DeviceShowCard';
import keywordSearch from '../../utils/keywordSearch';

export default () => {
  const [keyword, setKeyword] = useState('');
  //标题
  const [routerInfo] = useRouter();
  const { name, id = '' } = routerInfo.params;
  useNavigationBar({ title: name });
  const { data, error, loading } = useRequest(() => getAllDevice(id), {
    throwOnError: true,
  });
  if (data?.length === 0) {
    return (
      <div
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        该组织暂无可租借设备
      </div>
    );
  }
  const filterList = data?.filter((i) => {
    if (keyword === '') return true;
    return keywordSearch(i.deviceName, keyword);
  });
  return (
    <>
      <Search
        shape="round"
        background="#4fc08d"
        placeholder="请输入搜索的设备名称"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.detail);
        }}
      />
      <div>
        {filterList?.map((i) => {
          return (
            <div
              style={{ width: '100vw', padding: '5px' }}
              key={i.deviceId}
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/timeForm/timeForm?deviceId=${i.deviceId}&title=${i.deviceName}&organizationId=${id}`,
                });
              }}
            >
              <DeviceShowCard item={i} />
            </div>
          );
        })}
        {filterList?.length === 0 && (
          <Empty image="search" description="无相关设备" />
        )}
      </div>
    </>
  );
};
