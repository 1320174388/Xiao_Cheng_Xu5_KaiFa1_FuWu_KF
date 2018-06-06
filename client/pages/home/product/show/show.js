// pages/product/product.js
var config = require('../../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图片和名称
    imgg: [{
      id: 1,
      showSrc: 'https://lg-14y7j4wa-1256666116.cos.ap-shanghai.myqcloud.com/lun1.jpg'
    },
    {
      id: 2,
      showSrc: 'https://lg-14y7j4wa-1256666116.cos.ap-shanghai.myqcloud.com/lun2.jpg'
    },
    {
      id: 3,
      showSrc: 'https://lg-14y7j4wa-1256666116.cos.ap-shanghai.myqcloud.com/lun3.jpg'
    }
    ]
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
    if (wx.getStorageSync("show_img") == ""){

    }else{
      this.setData({
        imgg: wx.getStorageSync("show_img")
      })
    }
    
    
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