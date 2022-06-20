function keywordSearch(str: string, keyword: string) {
  if (str === null || str === undefined) return false;
  return (
    str.includes(keyword) ||
    new RegExp('(.*?)' + Array.from(keyword).join('(.*?)') + '(.*?)').test(str)
  );
}
export default keywordSearch;
