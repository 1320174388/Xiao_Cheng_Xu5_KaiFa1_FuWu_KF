// pages/admin/index/index.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      btn_arr:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This = this;
    // 请求管理员可管理模块信息
    app.post(
      config.service.getAdminModular, {
        'token': wx.getStorageSync('token'),
      }, function (res) {
        This.setData({
          // 请求管理员可管理模块信息
          btn_arr: res.data.retData
        });
      },
    )
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
  web_jump:function(res){
      var idn = res.currentTarget.id;
      var url = this.data.btn_arr[idn].right_route;
      wx.navigateTo({
        url: url,
      })
  }
})