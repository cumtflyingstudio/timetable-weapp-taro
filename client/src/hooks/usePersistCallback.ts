import { useCallback, useRef } from 'react';

export const usePersistCallback = <Params extends any[], Return>(
  callback: (...args: Params) => Return,
) => {
  const ref = useRef(callback);
  ref.current = callback;

  return useCallback((...args: Params) => {
    return ref.current(...args) as Return;
  }, []);
};
