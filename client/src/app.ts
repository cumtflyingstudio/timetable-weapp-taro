import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { UserInfoContainer } from './hooks/useGlobalUserInfo';
import './app.less';
import { CurrRoomContainer } from './hooks/useGlobalCurrRoom';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

class App extends Component {
  componentDidMount() {
    // if (process.env.TARO_ENV === 'weapp') {
    //   Taro.cloud.init({ env: 'timetable-cloud-5gsmmicb8ab86239' });
    // }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  render() {
    return React.createElement(
      UserInfoContainer.Provider,
      null,
      React.createElement(CurrRoomContainer.Provider, this.props as any),
    );
  }
}

export default App;
