// miniprogram/pages/my/my.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsNum:'',
    CarsNum:"",
    userInfo: {},
    isShow:true
  },

  onLoad: function() {
    this.getuser();
    },
    getuser(){
      // 查看是否授权
      wx.getSetting({
        success:(res)=> {
          console.log(res);
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: (res) =>{
                console.log(res.userInfo)
                console.log("成功");
                this.setData({
                  isShow:false
                })

                //用户已经授权过
              }
            })
          }else{
            console.log("失败")
            this.setData({
              isShow:true
            })
          }
        }
      })
      var page = this;
      //拿到userInfo的信息
      if (app.getUserInfo) {
        console.log('有函数')
      }
      //获取用户信息
      wx.getUserInfo({
        success: (res) => {
          //解构赋值
          let {
            userInfo
          } = res;
          this.setData({
            userInfo: res.userInfo
          })
        },
        fail: (res) => {
          console.log("调用了失败的回调");
        }
      });

    },
  
 
 
  //绑定的是否登录授权的事件
  isGetinfo(data) {
    if (data.detail.rawData) {
      //点击了允许
      console.log("允许");
      this.getuser();

    } else {
      //点击了不允许
      console.log("不");
    }
  },

  // 统计发布的商品
  countGoods:function(){
    var that = this
    wx.cloud.callFunction({
      name:"getGoods",
      success(res){
        that.setData({
          goodsNum: res.result.data.length
        })
        console.log(res.result.data.length)
      }
    })
  },

  //统计已购买商品
  countCar:function(){
    var that =this
    wx.cloud.callFunction({
      name:"getOrder",
      success(res){
        that.setData({
          CarsNum: res.result.data.length
        })
        console.log(res.result.data.length)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.countGoods();
    this.countCar();
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