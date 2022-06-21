import Taro, { showToast } from '@tarojs/taro';
import { useState, useCallback, useEffect } from 'react';
import { Button, CellGroup, Field, Image } from '@antmjs/vantui';
import loginPng from '../../assets/img/login/login.png';
import fetchLogin, { addTokenInterceptor } from '../../service/user/login';
import { useAvatar } from '../../components/Avatar/useAvatar';
import './login.less';

const useLogin = () => {
  const { store } = useAvatar();
  const login = useCallback(async (username, password) => {
    const { token, loginAccount } = await fetchLogin(username, password);
    addTokenInterceptor(token);
    // 本地存储
    Taro.setStorageSync('token', token);
    Taro.setStorageSync('username', loginAccount);
    Taro.getUserProfile({
      desc: '获取用户头像',
      success(e) {
        const avatarUrl = e.userInfo.avatarUrl;
        store.avatarUrl = avatarUrl;
        Taro.setStorageSync('avatarUrl', avatarUrl);
      },
    });
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
  return { login };
};
const Router = () => {
  let token = Taro.getStorageSync('token');
  let expirationTime = Taro.getStorageSync('expirationTime');

  if (token && new Date().getTime() < expirationTime) {
    addTokenInterceptor(token);
    Taro.switchTab({
      url: '/pages/index/index',
    })
      .then(() => {
        showToast({
          title: '自动登录成功',
          icon: 'success',
          duration: 2000,
        }).then(() => {});
      })
      .catch((err) => {
        showToast({
          title: '登录身份已过期',
          icon: 'success',
          duration: 2000,
        }).then(() => {});
      });
  }
  return <></>;
};

function Login() {
  const { login: loginAndNavigate } = useLogin();
  const [input, setInput] = useState('' || '08192862');
  const [password, setPassword] = useState('123');

  const onChange = useCallback(
    (event) => {
      setInput(event.detail);
      return;
    },
    [input],
  );
  const onChange2 = useCallback(
    (event) => {
      setPassword(event.detail);
      return;
    },
    [password],
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
        <div style={{ fontSize: 20, fontWeight: 'bold' }}>翔预约</div>
        <CellGroup style={{ width: '100%' }}>
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
        </CellGroup>
        <Button
          type="primary"
          size="large"
          round
          style={{
            marginTop: '100px',
          }}
          onClick={() => loginAndNavigate(input, password)}
        >
          登录
        </Button>
      </div>
      {/* <Image src={loginPng} style={{ height: '250px', width: '100vw' }} /> */}
    </>
  );
}

export default Login;
