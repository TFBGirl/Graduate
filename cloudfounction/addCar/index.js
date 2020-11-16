// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
// 获取加入数据库商品的信息
exports.main = async (event, context) => {
  return db.collection('goodsCar').add({
    data:{
      gcName:event.name,
      gcClassify:event.classify,
      gcDetail:event.detail,
      gcImg:event.img,
      gcPrice:event.price,
      gcID:event.id
    }
  })
}