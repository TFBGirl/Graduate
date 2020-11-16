// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var db = cloud.datebase();
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('address').update()
}