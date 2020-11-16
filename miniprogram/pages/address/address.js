// miniprogram/pages/address/address.js
const db = wx.cloud.database().collection("address");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        value: 'one',
        name: '默认'
      },
      {
        value: 'one',
        name: '家'
      },
      {
        value: 'one',
        name: '公司'
      },
      {
        value: 'one',
        name: '学校'
      }
    ],
    region: ['广东省', '深圳市', '龙华区'],
    customItem: '',
    receiver: "",
    addr: "",
    phone: "",
    detailAddress: "",
    status:""
  },
  // 三级联动选择地址
  province: function (e) {
    console.log('选择地区', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  radioChange:function(e){
    console.log("statue值为",e.detail.value)
    this.setData({
      status:e.detail.value
    })
  },

  // 提交地址信息
  formSubmit: function (e) {
    console.log(e.detail.value);
    var receiver = e.detail.value.receiver;
    var addr = e.detail.value.addr;
    var phone = e.detail.value.phone;
    var detailAddress = e.detail.value.detailAdress;
    var status = this.data.status
    console.log("输出结果为:", )
    wx.showLoading({
      title: "添加成功",
      icon: "loading"
    })
    wx.cloud.callFunction({
      name: "addAddress",
      data: {
        receiver: receiver, //收货人
        addr: addr, //地址
        detailAddress: detailAddress, //详细地址  
        phone: phone, //电话号码
        status:status
      },
      success(res) {
        wx.hideLoading()
        console.log("添加成功", res)
      },
      fail(res) {
        wx.showLoading({
          title: "添加失败",
          icon: "loading"
        })
        console.log("添加失败", res)
      }
    })
  },

  // 点击保存跳转到地址展示页面
  jumpAddrShow: function () {
    wx.navigateTo({
      url: '../addrshow/addrshow',
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

  },
})