export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://reserve.atcumt.com/'
    : 'http://localhost:6200/';
// export const baseUrl = 'https://www.surprisehui.top:8080/';

function trim(str: string) {
  str = str.replace(/^\/(.+?)\/$/, '$1').trim();
  return str;
}

function getUrl(baseUrl: string, module: string, urlDetail: string) {
  const args = [module, urlDetail].map(trim);
  return baseUrl + args.join('/');
}

//仅需要填入两个URL参数。
const UrlCreate = (module: string, urlDetail: string) =>
  getUrl(baseUrl, module, urlDetail);

function createUrl(url: string) {
  let requestPath = url;
  if (requestPath.startsWith('/')) {
    requestPath = requestPath.slice(1);
  }
  return baseUrl + requestPath;
}

export { createUrl };

export default UrlCreate;
