import Taro from "@tarojs/taro";
import { useState, useCallback, useEffect } from "react";
import { Button, CellGroup, Field } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import "./login.less";
import fetchLogin from "../../service/user/login";

const useLogin = () => {
  const login = useCallback(async (username, password) => {
    await fetchLogin(username, password);
    await Taro.switchTab({
      url: "/pages/index/index",
    });
  }, []);
  return { login };
};

function Login() {
  const { login: loginAndNavigate } = useLogin();
  const [input, setInput] = useState("" || "08192862");
  const [password, setPassword] = useState("123");
  const onChange = useCallback(
    (event) => {
      setInput(event.detail);
      return;
    },
    [input]
  );
  const onChange2 = useCallback(
    (event) => {
      setPassword(event.detail);
      return;
    },
    [password]
  );

  return (
    <View>
      <CellGroup>
        <Field
          value={input}
          placeholder="请输入用户名"
          label="用户名"
          required={true}
          onChange={onChange}
        />
        <Field
          value={password}
          type="password"
          label="密码"
          placeholder="请输入密码"
          required={true}
          onChange={onChange2}
        />
        <Button
          type="primary"
          size="large"
          round
          onClick={() => loginAndNavigate(input, password)}
        >
          登录
        </Button>
      </CellGroup>
    </View>
  );
}

export default Login;
