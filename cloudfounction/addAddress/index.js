// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('address').add({
    data:{
      receiver: event.receiver,//收货人
      addr: event.addr,//地址
      detailAddress: event.detailAddress, //详细地址  
      phone: event.phone,//电话号
      status:event.status
    }
  })
}