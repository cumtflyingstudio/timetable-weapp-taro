import Taro from "@tarojs/taro";
import URL from "../baseUrl";
import sFetch from "../sFetch";

const loginURL = URL("api", "auth/login");

function addTokenInterceptor(token) {
  const interceptor: Taro.interceptor = function (chain) {
    const requestParams = chain.requestParams;
    requestParams.header = {
      ...(requestParams.header ?? {}),
      Authorization: token,
    };
    return chain.proceed(requestParams).then((res) => {
      return res;
    });
  };
  Taro.addInterceptor(interceptor);
}

interface ReturnData {
  loginAccount: string;
  token: string; //带Bearer前缀
  expirationTime: number;
}

async function login(username: string, password: string) {
  const res = await sFetch<ReturnData>({
    logTitle: "执行登录操作",
    url: loginURL,
    method: "POST",
    data: {
      username,
      password,
    },
    dataType: "json",
  });
  return res;
}

export default login;
export { login, addTokenInterceptor };
