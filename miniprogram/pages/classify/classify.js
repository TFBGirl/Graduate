// miniprogram/pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    classify: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },

  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
    var viewDataSet = e.target.dataset;
    var viewText = viewDataSet.text;
    console.log("商品类型", viewText); //输出该文本
    wx.cloud.callFunction({
      name: "getClassify",
      data: {
        text: viewText
      }
    }).then(res => {
      console.log("此类商品有:", res)
      that.setData({
        classify: res.result.data
      })
    })
  },

  // 分类显示商品详情
  get: function (e) {
    console.log("商品详情的ID", e.currentTarget.dataset.value)
    var res = e.currentTarget.dataset.value
    if (res !== undefined) {
      wx.navigateTo({
        url: '../goodsDetail/goodsDetail?results=' + res,
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.cloud.callFunction({
      name: "getClassify",
      data: {
        text: "电脑"
      }
    }).then(res => {
      console.log("此类商品有:", res)
      that.setData({
        classify: res.result.data
      })
    })
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