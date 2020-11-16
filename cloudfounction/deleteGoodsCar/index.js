// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//获取购物车内商品信息并删除
const db = cloud.database();

// 云函数入口函数


exports.main = async (event, context) => {
  for (let i = 0; i < event.id.length; i++) {
    var dete = db.collection("goodsCar").where({
      _id: event.id[i]
    }).remove()
  }
  return dete
}