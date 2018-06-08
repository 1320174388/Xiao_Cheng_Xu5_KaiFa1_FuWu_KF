// pages/Subscribe/Subscribe.js
var config = require('../../../../config.js');
var app = getApp();
var height = 0;
var recommendImg = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host_image_Url: config.service.host_image_Url,
    admin_left: '',
    admin_top: '',
    // 屏幕宽度
    window_width: '',
    // 后台按钮宽度
    admin_btn_width: '',
    // 后台按钮点击事件
    admin_btn_event: 'admin_enter'
  },
  /**
   * 连续点击预约头像六次
   */
  headClick:function(){
    if (recommendImg == 5) {
      var userId = wx.getStorageSync('userId')
      app.point('你的ID为：' + userId, 'none', 5000);
      recommendImg = 0;
    } else {
      recommendImg++;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var e = wx.getSystemInfoSync();
    height = e.windowHeight;
    that.setData({
      window_width: e.windowWidth
    })
    var query = wx.createSelectorQuery().in(this);
    query.select('.admin_enter').boundingClientRect(function (res) {
      that.setData({
        admin_btn_width: res.width
      })
    }).exec()
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
    this.setData({
      admin_left: wx.getStorageSync("admin_left"),
      admin_top: wx.getStorageSync("admin_top")
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
  
  },
  jump_one: function () {
    wx.navigateTo({
      url: '../Subscribe3/Subscribe3'
    })
  },
  jump_one1: function () {
    wx.navigateTo({
      url: '../../product-show/product-show'
    })
  },
  // 后台按钮点击效果
  admin_enter: function (res) {

    if (this.data.admin_left == -this.data.admin_btn_width / 2) {

      this.setData({
        admin_left: 0
      })


    } else if (this.data.admin_left == this.data.window_width - this.data.admin_btn_width / 2) {
      this.setData({
        admin_left: this.data.window_width - this.data.admin_btn_width
      })

    } else if (this.data.admin_left == 0 || this.data.admin_left == this.data.window_width - this.data.admin_btn_width) {
      this.setData({
        admin_btn_event: 'admin_btn_event2'
      })
    }


  },
  //后台按钮变化后的效果
  admin_btn_event2: function () {
    wx.navigateTo({
      url: '../../../admin/index/index',
    })
  },
  // 后台按钮拖拽效果
  admin_move: function (res) {
    var clientY = res.touches[0].clientY - 15;
    if (clientY >= (height - (height / 18))) {
      clientY = height - (height / 18);
    };
    if (clientY <= 0) {
      clientY = 0;
    }
    this.setData({
      admin_left: res.touches[0].clientX - 20,
      admin_top: clientY
    })
  },
  admin_move_end: function () {
    clearTimeout(wx.getStorageSync("hide_btn"))
    wx.setStorageSync("admin_left", this.data.admin_left);
    wx.setStorageSync("admin_top", this.data.admin_top);
    var that = this;
    if (this.data.admin_left <= this.data.window_width / 2) {
      this.setData({
        admin_left: 0,
      })
      wx.setStorageSync("admin_left", this.data.admin_left);
      wx.setStorageSync("hide_btn", setTimeout(function () {
        that.setData({
          admin_left: -that.data.admin_btn_width / 2,
        });
        wx.setStorageSync("admin_left", that.data.admin_left);
        that.setData({
          admin_btn_event: 'admin_enter'
        })
      }, 2000));
      wx.getStorageSync("hide_btn");
    } else {
      that.setData({
        admin_left: this.data.window_width - this.data.admin_btn_width,
      })
      wx.setStorageSync("admin_left", this.data.admin_left)

      wx.setStorageSync("hide_btn", setTimeout(function () {
        that.setData({
          admin_left: that.data.window_width - that.data.admin_btn_width / 2,
        });
        wx.setStorageSync("admin_left", that.data.admin_left);
        that.setData({
          admin_btn_event: 'admin_enter'
        })
      }, 2000));
      wx.getStorageSync("hide_btn");
    }
  }

  
})