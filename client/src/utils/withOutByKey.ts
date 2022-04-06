type baseObj = {
  [key: string]: string;
};
/**
 *  求差集
 * @param arr1 集合1
 * @param arr2 集合2
 * @param key 两个集合中对象的key值
 * @returns arr1 - arr2 (差集)
 */
const withOutByKey = <T>(arr1: T[], arr2: T[], key: keyof T) => {
  if (arr1.length === 0) return [];
  const _arr2KeySet = new Set(arr2.map((i) => i[key]));
  const diff = arr1.filter((item) => !_arr2KeySet.has(item[key]));
  return diff;
};

/*
// console.log(
//   withOutByKey(
//     [{ key: "1" }, { key: "2" }, { key: "3" }, { key: "4" }, { key: "6" }],
//     [{ key: "1" }, { key: "2" }],
//     "key"
//   )
// );
*/
export default withOutByKey;
