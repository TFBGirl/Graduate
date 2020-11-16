// pages/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsCar: [],
    deleteId: []
  },

  //点击显示商品详情
  getGoodsDetail: function (e) {
    //购物车内商品的id
    var detailID = e.currentTarget.dataset.value
    if (detailID !== undefined) {
      wx.navigateTo({
        url: '../goodsDetail/goodsDetail?result=' + detailID,
      })
    }
  },

  //获取购物车内的商品
  getGoodsCar: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
      icon: "loading"
    })
    wx.cloud.callFunction({
      name: "getCar",
      success: function (res) {
        that.setData({
          goodsCar: res.result.data
        })
        wx.hideLoading()
        console.log(res);
        if(res.result.data.length===0){
          wx.showToast({
            title: '没有商品哦~',
            duration:3000,
            image:'../../images/哭脸 (2).png'
          })
          console.log("没有加入购物车的商品")
        }
        
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  // 获取要删除和结算的ID
  getID: function (e) {
    console.log("要算出和结算的id为", e.currentTarget.dataset.value)
    var deleteID = e.currentTarget.dataset.value;
    var Date = this.data.deleteId
    this.setData({
      deleteId: Date.concat(deleteID)
    })
    console.log("数组", this.data.deleteId)
  },

  //删除后及时刷新
  fresh: function () {
    var that = this
    var show = that.getGoodsCar()
    wx.hideLoading({
      freshCar: function () {
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
  //删除购物车内的商品
  deleteGoods: function () {
    console.log(this.data.deleteId)
    var that = this;
    wx.cloud.callFunction({
      name: "deleteGoodsCar",
      data: {
        id: that.data.deleteId
      },
      success: function (res) {
        wx.showToast({
          title: '删除成功',
          icon: "success"
        })
        that.fresh()
        console.log("删除成功", res)
      },
      fail(res) {
        console.log("删除失败", res)
      }
    })
    // console.log("sssss",that.data.deleteId)
  },

  //获取商品价格
  getPriceSettlement: function () {
    var that = this
    wx.cloud.callFunction({
      name: "getPriceSettlement",
      data: {
        id: that.data.deleteId
      },
      success(res) {
        wx.showModal({
          title: "确认支付" + res.result.data[0].oPrice + "元",
          success(ress) {
            if (ress.confirm) {
              wx.cloud.callFunction({
                //添加到订单页面
                name: "addOrder",
                data: {
                  oAddr: res.result.data[0].oAddr,
                  oImg: res.result.data[0].oImg,
                  oName: res.result.data[0].oName,
                  oDetail: res.result.data[0].oDetail,
                  oRecive: res.result.data[0].oRecive,
                  oPhone: res.result.data[0].oPhone,
                  oPrice: res.result.data[0].oPrice
                },
                success() {
                  wx.showToast({
                    title: '支付成功',
                    icon: "success",
                  })
                }
              })
            } else {
              wx.showToast({
                title: '支付失败',
                icon: "loading",
              })
            }
          }
        })
        console.log("商品价格为", res)
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsCar()
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
    var that = this
    wx.showLoading({
      success: (res) => {
        that.getGoodsCar()
        wx.showLoading({
          title: '加载中',
          icon: "loading"
        })
        wx.hideLoading()
      },
    })

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