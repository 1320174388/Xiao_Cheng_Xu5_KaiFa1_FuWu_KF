// pages/home/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // 轮播图img的地址
      swiper_imgUrl:[
        "./image/swiper_banner.png",
        "./image/swiper_banner.png",
        "./image/swiper_banner.png",
        "./image/swiper_banner.png"
      ],
      // icon图标的img和文字的地址
      icon:[
        {
          imgUrl:"./image/ChanPin_icon.png",
          text:"产品"
        },{
          imgUrl: "./image/ZhanShi_icon.png",
          text: "展示"
        },{
          imgUrl: "./image/MenDian_icon.png",
          text: "门店"
        },{
          imgUrl: "./image/YuYue_icon.png",
          text: "预约"
        }
      ],
      // 企业视频的地址
      
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
  // 拨打电话
  phoneCall:function(){
    wx.makePhoneCall({
      phoneNumber: '123456789'
    })
  }

})