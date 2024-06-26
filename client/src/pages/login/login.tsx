import Taro, { showToast } from '@tarojs/taro';
import { useState, useCallback } from 'react';
import { Button, CellGroup, Field, Image } from '@antmjs/vantui';
import { fetchLogin, fetchWxLogin } from '../../service/user/login';
import { showToast as showErrToast } from '../../utils/index';
import loginImg from '../../assets/img/login/login.png';
import { Icon } from '@antmjs/vantui';
import './login.less';
import { Router } from './AutomaticallyLogin';

const useLogin = () => {
  const redirectToIndex = useCallback(() => {
    setTimeout(async () => {
      await Taro.switchTab({
        url: '/pages/index/index',
      }).then(() => {
        showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000,
        });
      });
    }, 1000);
  }, []);

  const login = useCallback(async (username, password) => {
    await fetchLogin(username, password);
    redirectToIndex();
  }, []);

  const wxLogin = useCallback(async () => {
    const { code, errMsg } = await Taro.login();
    if (errMsg !== 'login:ok') {
      showErrToast(errMsg);
    }
    await fetchWxLogin(code);
    redirectToIndex();
  }, []);

  return { login, wxLogin };
};

function Login() {
  const { login: loginAndNavigate, wxLogin: wxLoginAndNavigate } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsername = useCallback(
    (event) => {
      setUsername(event.detail);
      return;
    },
    [setUsername],
  );
  const onChangePassword = useCallback(
    (event) => {
      setPassword(event.detail);
      return;
    },
    [setPassword],
  );

  return (
    <>
      <Router />
      <div
        style={{
          display: 'flex',
          width: '100vw',
          height: '80vh',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div style={{ width: '100vw', height: '200px' }}>
          <Image
            src={loginImg}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '60rpx',
              background: 'pink',
            }}
          />
        </div>
        <CellGroup style={{ width: '100%' }}>
          <Field
            value={username}
            placeholder="请输入用户名"
            label="用户名"
            required={true}
            onChange={onChangeUsername}
          />
          <Field
            value={password}
            type="password"
            label="密码"
            placeholder="请输入密码"
            required={true}
            onChange={onChangePassword}
          />
        </CellGroup>
        <Button
          type="primary"
          size="large"
          color="blue"
          round
          style={{
            marginTop: '100px',
          }}
          onClick={() => loginAndNavigate(username, password)}
        >
          登录
        </Button>

        <Button
          type="primary"
          size="large"
          round
          style={{
            marginTop: '10px',
          }}
          onClick={() => wxLoginAndNavigate()}
        >
          <Icon name="wechat" color="white" />
          微信一键登录
        </Button>
      </div>
    </>
  );
}

export default Login;
