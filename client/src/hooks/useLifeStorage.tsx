import React, {
  useReducer,
  createContext,
  createElement,
  useContext,
} from 'react';
import { getStorageSync, setStorageSync } from '@tarojs/taro';

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      const newState = { ...state, ...action.payload };
      setStorageSync(uniqueKey, newState);
      return newState;

    case 'reset':
      return action.payload;
    default:
      throw new Error();
  }
}
const uniqueKey = '@lifeStorage'; //本地缓存的总key
const lifeStorage = getStorageSync(uniqueKey) ?? {}; //开局自动获取
const LifeStorageContext = createContext(lifeStorage);

function useLifeStorageProvider() {
  const [state, dispatch] = useReducer(reducer, lifeStorage);

  const set = (key: string, value: unknown) => {
    dispatch({ type: 'add', payload: { [key]: value } });
  };
  const get = (key: string) => {
    return state[key];
  };
  const value = { set, get, state };
  const Provider = (props) => {
    const { children } = props;
    return (
      <LifeStorageContext.Provider value={value}>
        {children}
      </LifeStorageContext.Provider>
    );
  };
  return { state, LifeStorageProvider: Provider };
}
const useLifeStorage = () => {
  return useContext(LifeStorageContext);
};
export { useLifeStorageProvider, useLifeStorage };
