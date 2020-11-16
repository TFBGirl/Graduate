// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 数据库order增加
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('order').add({
    data: {
      oAddr: event.oAddr,
      oImg: event.oImg,
      oName: event.oName,
      oDetail: event.oDetail,
      oRecive: event.oRecive,
      oPhone: event.oPhone,
      oPrice:event.oPrice
    }
  })
}