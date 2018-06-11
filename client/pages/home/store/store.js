// pages/store/store.js
var config = require('../../../config.js');//引入config.js模块
var app = getApp();//引入app.js
var token;//定义token令牌
var height = 0;
var timer;
var numType = true,
  numTypes = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // 门店信息
      store_arr:'',
      job_show:'',
      // 后台按钮
      admin_left: '',
      admin_top: '',
      // 屏幕宽度
      window_width: '',
      // 后台按钮宽度
      admin_btn_width: '',
      // 后台按钮点击事件
      admin_btn_event: 'admin_enter',
      // 后台按钮显示
      admin_show: 'none',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 后台进入按钮的动画效果
    var e = wx.getSystemInfoSync();
    height = e.windowHeight;
    that.setData({
      window_width: e.windowWidth
    })
    var query = wx.createSelectorQuery().in(this);
    query.select('.admin_enter').boundingClientRect(function (res) {
      that.setData({
        admin_btn_width: that.data.window_width * 0.16 / 2
      })
      

    }).exec();
    // 定时器
    timer = setInterval(function () {
      if (numTypes) {
        setTimeout(function () {
          clearInterval(timer)
        }, 10000)
      }
      numTypes = false;
      if (!wx.getStorageSync("admin_show")) {
        return false;

      }
      if (!numType) {
        return false;
      }
      numType = false;
      that.setData({
        admin_show: 'block',
        admin_left: that.data.window_width - that.data.window_width * 0.16 / 4,
      });
      clearInterval(timer);
    }, 1000);
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
    });
    // 获取门店信息
    var that = this;
    //获取缓存中的token令牌
    token = wx.getStorageSync('token');
    //获取门店信息
    app.post(config.service.host + '/api/home/Store_Get/get_Store', {}, function (res) {
      if (res.data.errNum == 0) {
        // 请求成功
        var store_arr = res.data.retData;
        if (store_arr.length == 0) {
          that.setData({
            store_arr: '',
            job_show: true,
          })
        } else if (store_arr.length > 0) {
          for (var i = 0; i < store_arr.length; i++) {
            store_arr[i].store_img_url = config.service.host + res.data.retData[i].store_img_url
          }
          that.setData({
            store_arr: store_arr,
            job_show: false
          })
        }

      }
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
      url: '../../admin/index/index',
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
      wx.setStorageSync("admin_left", that.data.admin_left);

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
  },
  // 地老天荒拨打电话事件
  phone_dlth: function () {
    wx.makePhoneCall({
      phoneNumber: '01086220269'
    })
  }
  
})