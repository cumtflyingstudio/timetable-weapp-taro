import defaultConfig from "./theme/defaultTheme";

const { deepGreen } = defaultConfig;

const config = {
  pages: [
    "pages/index/index",
    "pages/my/my",
    "pages/timetable/timetable",
    "pages/timeForm/timeForm",
    "pages/areaDetail/areaDetail",
    "pages/login/login"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    color: "#dbdbdb",
    selectedColor: deepGreen,
    list: [
      {
        pagePath: "pages/index/index",
        text: "主页",
        iconPath: "./assets/img/_home.png",
        selectedIconPath: "./assets/img/home.png"
      },
      {
        pagePath: "pages/timetable/timetable",
        text: "记录",
        iconPath: "./assets/img/_time.png",
        selectedIconPath: "./assets/img/time.png"
      },
      {
        pagePath: "pages/my/my",
        text: "我的",
        iconPath: "./assets/img/_my.png",
        selectedIconPath: "./assets/img/my.png"
      }
    ]
  },
  cloud: true
};
export default config;
