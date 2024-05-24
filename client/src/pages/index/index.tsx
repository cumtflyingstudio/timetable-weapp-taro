import Applications from './comps/Applications/index';
import Swiper from './comps/Swiper';
import './index.less';
import { context, useListReducer } from './context';
import { useEffect } from 'react';
import Taro from '@tarojs/taro';
import addTokenInterceptor from '../../service/interceptors/addTokenInterceptor';

export default () => {
  const [state, dispatch] = useListReducer();
  useEffect(() => {
    let token = Taro.getStorageSync('token');

    if (token) {
      addTokenInterceptor(token);
    }
  }, []);

  return (
    <>
      <context.Provider value={{ state, dispatch }}>
        <div style={{ height: '200rpx', width: '100%' }}></div>
        <Swiper />
        <Applications applicationList={state.applicationList_added} />
      </context.Provider>
    </>
  );
};
