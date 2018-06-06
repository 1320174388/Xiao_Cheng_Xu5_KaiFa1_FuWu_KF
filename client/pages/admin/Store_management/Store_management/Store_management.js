// pages/home/admin/product_management/product_management/product_management.js
Page({



  /**
   * 页面的初始数据
   */
  data: {
    Store_arr: [{
      'img': "/pages/admin/image/a/dian.png",
      'Product_name': "石景山店",
      'Product_Info': "石景山古城店"
    }


    ],
    abc: ''//删除下标


  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

    


  },
  //点击编辑发送数据到缓存
  bj1: function (r) {

  },
  zj: function (t) {
   
  },

  sc1: function (k) {


    var that = this
    var abc = k.currentTarget.id
    console.log(k)

    wx.showModal({
      title: '提示',
      content: '是否确定删除',
      success: function (res) {
        if (res.confirm) {
          var a_arr = wx.getStorageSync('Store0')
          a_arr.splice(abc, 1)

          that.setData({ Store_arr: a_arr })
          wx.setStorageSync('Store0', a_arr)


        } else {

        }

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
  onShow: function () {

    if (wx.getStorageSync('Store0') == '') {

    } else {
      this.setData({ Store_arr: wx.getStorageSync('Store0') })
    }





  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")
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