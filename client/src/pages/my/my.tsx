import Taro, { Config } from "@tarojs/taro";
import "./my.less";
import { useTabBar } from "taro-hooks";
import { useState } from "react";

export default function My() {
  const {
    setTabBarVisible,
    setRedDotVisible,
    setBadgeVisible,
    setTabBarItem,
    setTabBarStyle
  } = useTabBar();
  const [show, setShow] = useState(true);
  return (
    <div>
      my
      <button
        onClick={() => {
          setTabBarVisible(!show, true);
          setShow(!show);
        }}
      >
        消失
      </button>
    </div>
  );
}
