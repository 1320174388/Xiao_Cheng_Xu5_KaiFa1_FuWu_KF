// pages/home/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // 轮播图img的地址
      swiper_imgUrl:[
        "../image/images-index/swiper_banner.png",
        "../image/images-index/swiper_banner.png",
        "../image/images-index/swiper_banner.png",
        "../image/images-index/swiper_banner.png"
      ],
      // icon图标的img和文字的地址
      icon:[
        {
          imgUrl:"../image/images-index/ChanPin_icon.png",
          text:"产品",
          url:"pages/home/product/product"
        },{
          imgUrl: "../image/images-index/ZhanShi_icon.png",
          text: "展示",
          url:"pages/home/product-show/product-show"
        },{
          imgUrl: "../image/images-index/MenDian_icon.png",
          text: "门店",
          url:"pages/home/mendian/mendian"
        },{
          imgUrl: "../image/images-index/YuYue_icon.png",
          text: "预约",
          url:"pages/home/reservation/reservation"
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
  },
  tiaozhuan:function(res){
    var idn = res.currentTarget.id;
    var icon_url = this.data.icon;

    console.log(icon_url[idn].url);
  }
  

})