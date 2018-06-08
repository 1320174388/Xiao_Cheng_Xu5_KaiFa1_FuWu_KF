// pages/home/admin/product_management/product_management_Add/product_management_Add.js
var config = require('../../../../config.js');//引入config.js模块
var app = getApp();//引入app.js
var token;//定义token令牌
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图片路径
    img: "/pages/admin/image/a/jia.png",
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    token = wx.getStorageSync('token');
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
  //选择图片
  choose: function (ch) {

    var that = this
    wx.chooseImage({

      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({ img: res.tempFilePaths })
      }
    })
  },

  //确定保存
  check: function (res) {
    var that = this;
    // 验证图片是否为空
    if (that.data.img == '/pages/admin/image/a/jia.png'){
      var img = "";
      app.point('请选择图片','none',1000)
    }else{
      
      var img = that.data.img[0];
      
      // 添加api
      wx.uploadFile({
        url: config.service.host + '/api/admin/Store_Management/add_Store',
        filePath: img,
        name: 'store_img_file',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        formData: {
          'token': token,
          'store_name': res.detail.value.Store_name,
          'store_addr': res.detail.value.Store_addr,
        },
        success: function (res) {
          var data = JSON.parse(res.data);
          if (data.errNum == 0) {
            // 添加成功
            // 返回上一页面
            wx.navigateBack({
              delta: 1
            })
          } else if (data.errNum == 1) {
            // 你没有权限进行此操作
            app.point(data.retMsg, "none", 1000);
          } else if (data.errNum == 2) {
            // 请填写门店名称
            app.point(data.retMsg, "none", 1000);
          } else if (data.errNum == 3) {
            // 请填写门店地址
            app.point(data.retMsg, "none", 1000);
          } else if (data.errNum == 4) {
            // 请正确上传门店图片
            app.point(data.retMsg, "none", 1000);
          } else if (data.errNum == 5) {
            // 添加失败
            app.point(data.retMsg, "none", 1000);
          }
        }
      })
    }
    


  }

})