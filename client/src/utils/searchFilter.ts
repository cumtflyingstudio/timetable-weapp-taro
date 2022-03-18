const searchFilter = <T>(dataList: T[], keyWord: string, key: keyof T) => {
  return (
    dataList?.filter(item => {
      const searchName = (item[key] as unknown) as string;
      return (
        searchName.includes(keyWord) ||
        new RegExp("(.*?)" + Array.from(keyWord).join("(.*?)") + "(.*?)").test(
          searchName
        )
      );
    }) || []
  );
};
export default searchFilter;
