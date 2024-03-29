// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const id = event.id;
  console.log(id);
  const res = await db
    .collection("area")
    .where({ organizationId: _.eq(id) })
    .get();
  return res;
};
