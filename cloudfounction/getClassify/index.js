// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 初始化数据库
const db = cloud.database();

// 云函数入口函数
// 分类查询
exports.main = async (event, context) => {
  const classify=event.text;
  return db.collection("goods").where({
    gClassify:classify
  }).get()
}