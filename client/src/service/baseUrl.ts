const baseUrl = "http://1.13.5.80:8080/";

function trim(str: string) {
  str = str.replace(/^\/(.+?)\/$/, "$1").trim();
  return str;
}

function getUrl(baseUrl: string, module: string, urlDetail: string) {
  const args = [module, urlDetail].map(trim);
  return baseUrl + args.join("/");
}

//仅需要填入两个URL参数。
const UrlCreate = (module: string, urlDetail: string) =>
  getUrl(baseUrl, module, urlDetail);

export default UrlCreate;
