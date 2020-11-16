// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 发布二手商品
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('goods').add({
    data:{
      gName:event.goodsName,
      gDetail:event.goodsDetail,
      gClassify:event.goodsClass,
      gPrice:event.goodsPrice,
      imgSrc:event.goodsImg
    }
  })
}