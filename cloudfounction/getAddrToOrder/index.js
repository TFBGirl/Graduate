// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 获取相应的地址到购物详情
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('address').where({
    status:"默认"
  }).get()
}