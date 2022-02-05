export default {
  pages: ["pages/index/index", "pages/my/my"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    // custom: true,
    // color: "#000000",
    // selectedColor: "#000000",
    // backgroundColor: "#000000",
    list: [
      {
        pagePath: "pages/index/index",
        text: "组件"
      },
      {
        pagePath: "pages/my/my",
        text: "接口"
      }
    ]
  },
  cloud: true
};
