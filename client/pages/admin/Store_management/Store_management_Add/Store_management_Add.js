// pages/home/admin/product_management/product_management_Add/product_management_Add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "/pages/admin/image/a/jia.png",
    name1: "",
    name2: "",
    v1: '',
    v2: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //获取数据
  // cms1: function (a) {

  //   var that = this
  //   that.setData({ v1: a.detail.value })

  // },
  // cms2: function (b) {
  //   var that = this
  //   that.setData({ v2: b.detail.value })
  // },
  //确定保存
  check: function (w) {
    var that = this;
    var app = getApp();

    //获取
    var f_arr = wx.getStorageSync('Store0')


    //获取编辑的值
    var name2 = w.detail.value

    name2.img = that.data.img[0]




    if (name2.img == '/') {
      wx.showToast({
        title: '请添加一张图片',
        icon: 'none',
        duration:1000
      })


      console.log("图片没改变")
    } else {
      
      // 判断名称和产品介绍是否为空
      if (name2.Product_name == "") {
        app.point("请输入产品名称", "none", 1000);
      } else {
        if (name2.Product_Info == "") {
          app.point("请输入产品介绍", "none", 1000);
        } else {
          //替换
          f_arr.push(name2);
          //重新发回缓存
          wx.setStorageSync('Store0', f_arr)
          wx.navigateBack({
            delta: 1
          })
        }
      }

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