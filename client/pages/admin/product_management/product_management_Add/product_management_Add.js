// pages/home/admin/product_management/product_management_Add/product_management_Add.js
var config = require('../../../../config.js');//引入config.js模块
var app = getApp();//引入app.js
var token;//token令牌
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "/pages/admin/image/a/jia.png",
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    token = wx.getStorageSync('token');
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
        that.setData({ img: res.tempFilePaths })
      }
    })
  },

  //确定保存
  check: function (res) {
    var that = this;
    if (that.data.img == '/pages/admin/image/a/jia.png') {
      var img = "";
      app.point('请选择图片', 'none', 1000)
    } else {
      var img = that.data.img[0];
      app.point('上传中', 'loading', 10000)
      wx.uploadFile({
        url: config.service.host + '/api/admin/Set_Product/add_Product',
        filePath: img,
        name: 'product_img_file',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        formData: {
          'token': token,
          'product_name': res.detail.value.Product_name,
          'product_info': res.detail.value.Product_Info,
        },
        success: function (res) {
          console.log("运行成功返回函数 ")
          if (res.statusCode == 413) {
            getApp().point('请上传1M以内图片', "none", 1000);
            console.log("运行if ")
            return false;
          }else{
            var data = JSON.parse(res.data);
            console.log(data)
            if (data.errNum == 0) {
              getApp().point(data.retMsg, "success", 3000);
              // 添加成功
              setTimeout(function () {
                
                var pages = getCurrentPages(); // 当前页面  
                var beforePage = pages[pages.length - 2]; // 前一个页面 
                wx.navigateBack({
                  success: function () {
                    beforePage.onLoad(); // 执行前一个页面的onLoad方法  
                  }
                });
              }, 2000);
            }
            else if (data.errNum == 1) {
              // 你没有权限进行此操作
              app.point(data.retMsg, "none", 1000);
            } else if (data.errNum == 2) {
              // 请填写产品名称
              app.point(data.retMsg, "none", 1000);
            } else if (data.errNum == 3) {
              // 请填写产品地址
              app.point(data.retMsg, "none", 1000);
            } else if (data.errNum == 4) {
              // 请正确上传产品图片
              app.point(data.retMsg, "none", 1000);
            } else if (data.errNum == 5) {
              // 添加失败
              app.point(data.retMsg, "none", 1000);
            }
          }
        }
      })
    }


  







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