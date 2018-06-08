// pages/Subscribe3/Subscribe3.js
var config = require("../../../../config.js");//引用config.js文件

var token;//token令牌
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  jump_two: function (e) {
    var that = this
    //获取值
    var name = e.detail.value.name
    var phone = e.detail.value.phone
    var sex = e.detail.value.sex

    if (name == "") {
      getApp().point('请输入名字！', 'none', 2000);
    } else if (phone == "") {
      getApp().point('请输入手机号！', 'none', 2000);
    } else {
      //调用接口发送数据
      wx.request({
        url: config.Subscribe.Subscribe_file,
        data: {
          "name": name,
          "phone": phone,
          "sex": sex
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success: function (res) {
          if (res.data.errNum == 0) {
            getApp().point(res.data.retMsg, 'succes', 3000);
            that.setData({
              form_info: ''
            })
          } else {
            getApp().point(res.data.retMsg, 'none', 2000);
          }
        }
      })
    }
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

  }
})