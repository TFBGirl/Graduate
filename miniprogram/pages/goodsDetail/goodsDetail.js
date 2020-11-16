// miniprogram/pages/goodsDetail/goodsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    name: "",
    price: "",
    detail: "",
    imgSrc: "",
    goods: [],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var IndexID = options.id
    console.log("从首页传过来的值为：", IndexID)
    if (IndexID !== undefined) {
      this.setData({
        id: IndexID
      })
    }

    //从商品分类传过来的值为
    var classID = options.results
    console.log("从商品分类传过来的值为：", classID)
    if (classID !== undefined) {
      this.setData({
        id: classID
      })
    }

    // 从购物车传过来的值
    var carID = options.result
    console.log("从购物车传过来的值", carID)
    var that = this
    if (carID !== undefined) {
      wx.cloud.callFunction({
        name: "getGoodsCarDetail",
        data: {
          id: carID
        },
        success(res) {
          that.setData({
            id: res.result.data[0]._id,
            name: res.result.data[0].oName,
            price: res.result.data[0].oPrice,
            detail: res.result.data[0].oDetail,
            imgSrc: res.result.data[0].oImg,
          })
        },fail(res){
          console.log(res)
        }
      })
    }
  },

  //跳转到购物车页面
  GoTo:function(){
    wx.switchTab({
      url: '../car/car',
      success(res){
        console.log("跳转成功",res)
      },fail(res){
        console.log("跳转失败",res)
      }
    })     
  },

  //根据id显示商品详情
  getDoodsDetail: function () {
    console.log("商品详情的ID", this.data.id)
    var getID = this.data.id;
    var that = this;
    if (getID !== undefined) {
      wx.cloud.callFunction({
        name: "getGoodsDetail",
        data: {
          id: getID
        },
        success: function (res) {
          console.log("商品详情显示成功：", res)
          that.setData({
            goods: res.result.data[0],
            name: res.result.data[0].gName,
            detail: res.result.data[0].gDetail,
            price: res.result.data[0].gPrice,
            imgSrc: res.result.data[0].imgSrc

          })
        },
        fail(res) {
          console.log("商品详情显示失败", res)
        }
      })
    }
  },

  //加入购物车
  addCar: function (e) {
    console.log("商品id：", e.currentTarget.dataset.value)
    var that = e.currentTarget.dataset.value
    wx.cloud.callFunction({
      name: "addCar",
      data: {
        name: that.gName,
        classify: that.gClassify,
        price: that.gPrice,
        img: that.imgSrc,
        detail: that.gDetail,
        id: that._id
      },
      success(res) {
        console.log("加入购物车成功：", res)
        wx.showToast({
          icon: 'success',
          title: '加入购物车成功',
        })
      },
      fail(res) {
        console.log("加入购物车失败：", res)
      }
    })
  },

  // 跳转到订单页面
  jumpOrder: function (e) {
    console.log("商品价格：", e.target.dataset.value)
    var imgSrc = e.target.dataset.value.imgSrc,
      gPrice = e.target.dataset.value.gPrice,
      gDetail = e.target.dataset.value.gDetail,
      gName = e.target.dataset.value.gName
    wx.navigateTo({
      url: '../order/order?imgSrc=' + imgSrc + '&gPrice=' + gPrice + '&gDetail=' + gDetail + '&gName=' + gName,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.id!==undefined){
      this.getDoodsDetail()
    }
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