const db = wx.cloud.database();
let goodsName = "";
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    imgUrl: [{
        url: 'cloud://environment-7tvsz.656e-environment-7tvsz-1303193780/ceCuNuoJXgBSw.jpg'
      },
      {
        url: 'cloud://environment-7tvsz.656e-environment-7tvsz-1303193780/ceV1URBwZk6S6.jpg'
      },
      {
        url: 'cloud://environment-7tvsz.656e-environment-7tvsz-1303193780/cemJNerBNXNO2.jpg'
      }
    ],
    // 加号
    "jiahaoURl": "cloud://environment-7tvsz.656e-environment-7tvsz-1303193780/加号.png",
    "value": "",
    "goods": [],
  },

  //获取输入框中信息
  searchName: function (e) {
    console.log("获取到信息为", e.detail.value);
    this.setData({
      value: e.detail.value
    })
  },

  //模糊查询
  dimEnquiry: function (e) {
    var that = this;
     db.collection('goods').where(_.or([{
      gName: db.RegExp({
        regexp: that.data.value,
        options: 'i',
      })
    },
    {
      gClassify: db.RegExp({
        regexp: that.data.value,
        options: 'i',
      })
    }
  ])
       ).get({
      success(res) {
        console.log("模糊查询成功", res);
        that.setData({
          goods: res.data
        })
      },
      fail(res) {
        console.log("模糊查询失败", res)
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
    // 获取商品信息
    var that = this
    wx.cloud.callFunction({
      name: "getGoods",
      success(res) {
        that.setData({
          goods: res.result.data
        })
        console.log("所有商品：", res.result.data)
      },
      fail(res) {
        console.log("所有商品：", res)
      }
    })
  },

  // 首页跳转到商品详情   
  jumpGoodsDetail: function (e) {
    console.log("传到商品详情页面的ID为：", e.currentTarget.dataset.value)
    var id = e.currentTarget.dataset.value
    if (id !== undefined) {
      wx.navigateTo({
        url: "../goodsDetail/goodsDetail?id=" + id,
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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