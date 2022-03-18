import { useState } from "react";
import { useStorage as useTaroStorage } from "taro-hooks";

const useStorage = <T>(key: string, defaultValue: T) => {
  const [_, { set, get, remove }] = useTaroStorage();
  const [data, setData] = useState(defaultValue);

  /**
   *设置key - value
   * @param newValue
   * @returns 若成功则返回newValue本身
   */
  const newSet = async (newValue: T) => {
    const res = await set(key, newValue);
    if (res) {
      console.log("设置缓存成功", key, newValue);
    }
    return newValue;
  };

  /**
   * 获取key所对的value
   * @returns 没有设置则设置为defaultValue，如果设置，则返回
   */
  const newGet = () => {
    return new Promise<T>(resolve => {
      get(key)
        .then(res => {
          resolve(res as T);
          console.log("提取到本地缓存", key, res);
        })
        .catch(async err => {
          await newSet(defaultValue);
          resolve(defaultValue);
        });
    }).then(res => {
      setData(res);
    });
  };
  return { data: data, set: newSet, get: newGet };
};
export default useStorage;
