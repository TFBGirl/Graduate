// miniprogram/pages/addrshow/addrshow.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: [],
  },
  //展示收货地址信息
  showAddr: function () {
    var that = this
    wx.cloud.callFunction({
      name: "getAddress",
      success(res) {
        console.log("查询成功", res.result.data)
        that.setData({
          info: res.result.data
        })
      },
      fail(res) {
        console.log("查询失败", res);
      },
    })
  },
  // 点击编辑跳转到地址修改页面
  jumpAddress: function () {
    wx.navigateTo({
      url: '../address/address',
    })
  },

  //删除后及时刷新
  fresh: function () {
    var that = this
    var show = that.showAddr()
    wx.hideLoading({
      freshAddr: function () {
        show
      },
      success: (res) => {
        console.log("删除后及时刷新：", res)
      },
      fail(res) {
        console.log("删除后及时刷新失败：", res)
      }
    })
  },

  // 删除地址信息
  deleteAddress: function (e) {
    var id = e.currentTarget.dataset.value
    wx.showLoading({
      title: '正在删除...',
      icon: 'loading'
    })
    var that = this
    wx.cloud.callFunction({
      name: "deleteAddress",
      data: {
        ids: id
      },
      success: function (res) {
        wx.hideLoading({
          title: "删除成功",
          icon: "success"
        })
        that.fresh()
        console.log("删除成功：", res)
      },
      fail(res) {
        console.log("删除失败", res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    var show = that.showAddr()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onshow: function (e) {},
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