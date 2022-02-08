import React, { Component } from "react";
import Taro, { Config } from "@tarojs/taro";

import "./app.less";

class App extends Component {
  componentDidMount() {
    if (process.env.TARO_ENV === "weapp") {
      Taro.cloud.init();
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
