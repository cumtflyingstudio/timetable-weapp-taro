import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import './app.less';

class App extends Component {
  componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init({ env: 'timetable-cloud-5gsmmicb8ab86239' });
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  render() {
    return this.props.children;
  }
}

export default App;
