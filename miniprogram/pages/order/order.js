// miniprogram/pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receiver: "",
    phone: "",
    addr: [],
    gName: "",
    gDetail: "",
    gPrice: "",
    imgSrc: "",
  },

  // 获取地址信息
  getAddress: function () {
    var that = this
    wx.cloud.callFunction({
      name: "getAddrToOrder",
      success: function (res) {
        console.log(res)
        that.setData({
          receiver: res.result.data[0].receiver,
          phone: res.result.data[0].phone,
          addr: res.result.data[0].addr,
          res:res.result.data[0]
        })
        console.log("获取到的地址信息为", res)
      },
      fail(res) {
        console.log("获取商品信息失败", res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress()
    this.setData({
      gName: options.gName,
      gDetail: options.gDetail,
      gPrice: options.gPrice,
      imgSrc: options.imgSrc,
      option:options
    })
    console.log("传过来的值：", options)
  },

  // 提交订单
  submitOrder:function(){
    var oAddr = this.data.addr,
     oImg = this.data.imgSrc,
     oName = this.data.gName,
     oDetail = this.data.gDetail,
     oRecive = this.data.receiver,
     oPhone = this.data.phone,
     oPrice = this.data.gPrice
    wx.cloud.callFunction({
      name:"addOrder",
      data:{
        oAddr:oAddr,
        oImg:oImg,
        oName:oName,
        oDetail:oDetail,
        oRecive:oRecive,
        oPhone:oPhone,
        oPrice:oPrice
      },
      success(res){
        console.log("商品订单生成功",res)
        wx.showModal({
          title:"确认支付"+oPrice+"元",
          success(res){
            wx.showToast({
              title: '支付成功',
              icon:"success",
              success:function(){
                wx.navigateTo({
                  url: '../index/index',
                })
              }
            })
          }
        })
      },fail(res){
        console.log("商品订单生失败",res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})