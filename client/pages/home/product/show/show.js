// pages/product/product.js
var config = require('../../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图片和名称
    imgg: null,
    host: config.infomation.host,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This = this;
    // 获取项目配置信息接口
    app.post(
      config.infomation.get_service_config_type, {
        'token': wx.getStorageSync('token'),
        service_type: 'config_data'
      }, function (res) {
        This.setData({
          // 获取展示图片
          imgg: res.data.retData.notice_image,
        });
      }
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
    // if (wx.getStorageSync("show_img") == ""){

    // }else{
    //   this.setData({
    //     imgg: wx.getStorageSync("show_img")
    //   })
    // }
    
    
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