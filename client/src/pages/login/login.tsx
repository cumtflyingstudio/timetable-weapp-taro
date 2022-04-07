import Taro from "@tarojs/taro";
import { useState, useCallback, useEffect } from "react";
import { Button, CellGroup, Field } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import "./login.less";
import fetchLogin from "../../service/user/login";
import { useStore } from "../../Piniadux/defineStore";

const useLogin = () => {
  const login = useCallback(async (username, password) => {
    await fetchLogin(username, password);
    await Taro.switchTab({
      url: "/pages/index/index",
    });
  }, []);
  return { login };
};

function Hello1() {
  const { store } = useStore("state", {
    state() {
      console.log("创建了新的state");
      return {
        hello: 1,
      };
    },
  });

  return (
    <>
      <div>我是子组件1 {store.hello}</div>
      <Button
        type="danger"
        size="large"
        round
        onClick={() => {
          console.log(store.hello);
        }}
      >
        测试get
      </Button>
      <Button
        type="danger"
        size="large"
        round
        onClick={() => {
          store.hello += 1;
        }}
      >
        测试set {store.hello}
      </Button>
    </>
  );
}

function Hello2() {
  const { store } = useStore("state");

  return (
    <>
      <div>我是子组件2 {store.hello}</div>
      <Button
        type="primary"
        size="large"
        round
        onClick={() => {
          console.log(store.hello);
        }}
      >
        测试get
      </Button>
      <Button
        type="primary"
        size="large"
        round
        onClick={() => {
          store.hello += 1;
        }}
      >
        测试set {store.hello}
      </Button>
    </>
  );
}

function Login() {
  console.log("rerender");
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
      <Hello1 />
      <Hello2 />
    </View>
  );
}

export default Login;
