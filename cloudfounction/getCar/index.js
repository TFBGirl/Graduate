// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 获取购物车内商品
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('goodsCar').get()
}