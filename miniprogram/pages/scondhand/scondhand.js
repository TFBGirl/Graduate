// miniprogram/pages/scondhand/scondhand.js
var app = getApp;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UploadImg: "",
    form: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  // 选择图片
  ChooseImg: function (e) {
    console.log("图片路径为:", e)
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
        });
        console.log("上传图片成功", res);
        that.YunStorage(res.tempFilePaths[0])
      },
      fail(res) {
        console.log("上传失败", res)
      }
    });
  },
  // 将图片上传到云存储
  YunStorage: function (FileUrl) {
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + '.png', // 上传至云端的路径
      filePath: FileUrl, // 小程序临时文件路径
      success: res => {
        console.log("上传云存储成功", res);
        this.setData({
          UploadImg: res.fileID,

        })
      },
      fail(res) {
        console.log("上传失败", res)
      }
    })
  },
  // 跳转到地址修改
  jumpAddress: function () {
    wx.navigateTo({
      url: '../addrshow/addrshow',
    })
  },
  // 提交发布信息表单
  publishInfo: function (e) {
    var that = this
    var goodsName = e.detail.value.goodsName,
      goodsClass = e.detail.value.goodsClassify,
      goodsDetail = e.detail.value.goodsDetail,
      goodsPrice = e.detail.value.goodsPrice,
      goodsImg = that.data.UploadImg
    console.log("上传图片路径：", goodsImg)
    console.log("表单提交", e);
    wx.cloud.callFunction({
      name: 'addGoods',
      data: {
        goodsName: goodsName,
        goodsClass: goodsClass,
        goodsDetail: goodsDetail,
        goodsPrice: goodsPrice,
        goodsImg: goodsImg
      },
      success(res) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
        })
        that.setData({
          form: "",
          UploadImg: ""

        })
        console.log("发布商品成功：", res)

      },
      fail(res) {
        console.log("发布商品失败：", res)
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