// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 获取地址信息
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('address').get();
}