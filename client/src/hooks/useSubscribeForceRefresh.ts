import { useEffect } from 'react';
import { usePersistCallback } from './usePersistCallback';

// 用于返回上一页，使当前页面栈中的视图刷新
const listenerList: (() => void)[] = [];

const remove = (ele: () => void) => {
  const index = listenerList.findIndex(ele);
  listenerList.splice(index, 1);
};

// 需前一个页面手动订阅
function useSubscribeForceRefresh(fn: () => void) {
  const persistFn = usePersistCallback(() => {
    fn();
  });
  useEffect(() => {
    listenerList.push(persistFn);
    return () => {
      remove(persistFn);
    };
  }, []);
}

function forceRefresh() {
  listenerList.forEach((fn) => fn());
}

export { forceRefresh, useSubscribeForceRefresh };
