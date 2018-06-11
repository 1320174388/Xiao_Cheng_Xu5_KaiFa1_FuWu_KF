// pages/home/admin/product_management/product_management/product_management.js
var config = require('../../../../config.js');//引入config.js模块
var app = getApp();//引入app.js
var token;//定义token令牌
Page({
  /**
   * 页面的初始数据
   */
  data: {  // 产品列表
    Product_arr: '',
    // 没有添加产品时显示
    job_show: true


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    //获取缓存中的token令牌
    token = wx.getStorageSync('token');
    //获取产品信息
   
    app.post(config.service.host + '/api/home/Product_Get/get_Product', {},  function (res) {
      console.log(res.data)
      if (res.data.errNum == 0) {
        // 请求成功
        var product_arr = res.data.retData;
        if (product_arr.length == 0) {
          that.setData({
            Product_arr: '',
            job_show: true,
          })
        } else if (product_arr.length > 0) {
          for (var i = 0; i < product_arr.length; i++) {
            product_arr[i].product_img_url = config.service.host + res.data.retData[i].product_img_url
          }
          that.setData({
            Product_arr: product_arr,
            job_show: false
          })
        }

      }
    })

  },
  // 删除
  removeProduct: function (res) {
    var that = this;
    var removeId = res.currentTarget.id;
    wx.showModal({
      title: '提示',
      content: '是否确定删除',
      success: function (res) {
        if (res.confirm) {
          
          
          // 删除api
          app.post(config.service.host + '/api/admin/Set_Product/del_Product', {
            'token': token,
            'product_id': removeId
          }, function (res) {
            if (res.data.errNum == 0) {
              // 删除成功
              app.point(res.data.retMsg, 'success', 1000);
              // 刷新onload
              that.onLoad();
            } else if (res.data.errNum == 1) {
              // 你没有权限进行此操作
              app.point(res.data.retMsg, 'none', 1000)
            } else if (res.data.errNum == 2) {
              // 请发送要删除的产品ID
              app.point("请选择要删除的产品", 'none', 1000)
            } else if (res.data.errNum == 3) {
              // 删除失败
              app.point(res.data.retMsg, 'none', 1000)
            }
          })
        } else {

        }

      }
    })






   

  },
  // 编辑
  edit: function (res) {
    var index = res.currentTarget.id;
    var product_arr = this.data.Product_arr;
    wx.navigateTo({
      url: '../product_management_Edit/product_management_Edit?product_name=' + product_arr[index].product_name + '&product_info=' + product_arr[index].product_info + '&product_id=' + product_arr[index].id + '&product_img=' + product_arr[index].product_img_url,
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