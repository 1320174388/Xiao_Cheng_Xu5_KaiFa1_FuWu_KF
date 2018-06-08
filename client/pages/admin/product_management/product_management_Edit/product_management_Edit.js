// pages/home/admin/product_management/product_management_Edit/product_management_Edit.js
var config = require('../../../../config.js');//引入config.js模块
var app = getApp();//引入app.js
var token;//定义token令牌
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 要提交的img路径
    img: "",
    // 默认信息
    product_img: "",
    product_name: "",
    product_id: "",
    product_info: ""
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    token = wx.getStorageSync('token');
    this.setData({
      product_img: e.product_img,
      product_name: e.product_name,
      product_id: e.product_id,
      product_info: e.product_info
    })


  },
  
  
  check: function (res) {
    var that = this;
    // 判断图片是否修改
    if (that.data.img == '') {
      app.post(config.service.host + '/api/admin/Set_Product/edit_Product', {
        'token': token,
        'product_id': that.data.product_id,
        'product_name': res.detail.value.product_name,
        'product_info': res.detail.value.product_info,
      }, function (res) {
        if (res.data.errNum == 0) {
          // 更新成功
          // 返回上一页
          setTimeout(function () {
            console.log("定时器")
            var pages = getCurrentPages(); // 当前页面  
            var beforePage = pages[pages.length - 2]; // 前一个页面 
            wx.navigateBack({
              success: function () {
                beforePage.onLoad(); // 执行前一个页面的onLoad方法  
              }
            });
          }, 2000);
        } else if (res.data.errNum == 1) {
          // 你没有权限进行此操作
          app.point(res.data.retMsg, "none", 1000);
        } else if (res.data.errNum == 2) {
          // 请发送要删除的门店ID
          app.point("请选择要修改的门店ID", "none", 1000);
        } else if (res.data.errNum == 3) {
          // 请填写门店名称
          app.point(res.data.retMsg, "none", 1000);
        } else if (res.data.errNum == 4) {
          // 请正确上传门店图片
          app.point(res.data.retMsg, "none", 1000);
        } else if (res.data.errNum == 5) {
          // 更新失败
          app.point(res.data.retMsg, "none", 1000);
        }
      })
    } else {
      app.point('上传中', 'loading', 10000)
      wx.uploadFile({
        url: config.service.host + '/api/admin/Set_Product/edit_Product',
        filePath: that.data.img,
        name: 'product_img_file',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        formData: {
          'token': token,
          'product_id': that.data.product_id,
          'product_name': res.detail.value.product_name,
          'product_info': res.detail.value.product_info,
        },
        success: function (res) {
          var data = JSON.parse(res.data);
          if (data.errNum == 0) {
            // 更新成功
            // 返回上一页
            setTimeout(function () {
              console.log("定时器")
              var pages = getCurrentPages(); // 当前页面  
              var beforePage = pages[pages.length - 2]; // 前一个页面 
              wx.navigateBack({
                success: function () {
                  beforePage.onLoad(); // 执行前一个页面的onLoad方法  
                }
              });
            }, 2000);
          } else if (data.errNum == 1) {
            // 你没有权限进行此操作
            app.point(data.retMsg, "none", 1000);
          } else if (data.errNum == 2) {
            // 请发送要删除的门店ID
            app.point("请选择要修改的门店ID", "none", 1000);
          } else if (data.errNum == 3) {
            // 请填写门店名称
            app.point(data.retMsg, "none", 1000);
          } else if (data.errNum == 4) {
            // 请正确上传门店图片
            app.point(data.retMsg, "none", 1000);
          } else if (data.errNum == 5) {
            // 更新失败
            app.point(data.retMsg, "none", 1000);
          }

        }
      })
    }
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
        var tempFilePaths = res.tempFilePaths
        that.setData({ 
          product_img: res.tempFilePaths[0] ,
          img: res.tempFilePaths[0]
        })
        
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {

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