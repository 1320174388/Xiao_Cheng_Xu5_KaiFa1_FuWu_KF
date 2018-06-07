// pages/admin/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      btn_arr:[
        {
          "name":"权限管理",
          "url":"../jurisdiction/jurisdiction"
        },
        {
          "name": "管理列表",
          "url": "../administrators/administrators"
        },
        {
          "name": "门店管理",
          "url": "../Store_management/Store_management/Store_management"
        },
        {
          "name": "查看预约",
          "url": "../reserve/reserve"
        },
        {
          "name": "信息管理",
          "url": "../informationManager/infoManager"
        },
        {
          "name": "产品管理",
          "url": "../product_management/product_management/product_management"
        }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.setStorageSync("reserve_arr_false",[{
      name:"张三",
      phone:12345678978,
      sex:"男",
      time:"2018年12月12日12时",
      reserve:false,
      reserve_text:"未处理"

    },
      {
        name: "张四",
        phone: 12345678978,
        sex: "女",
        time: "2018年10月02日10时",
        reserve: false,
        reserve_text: "未处理"

      }, {
        name: "张五",
        phone: 12345678978,
        sex: "男",
        time: "2018年8月19日18时",
        reserve: false,
        reserve_text: "未处理"

      }] );
    wx.setStorageSync("reserve_arr_true", [{
      name: "王三",
      phone: 12345678978,
      sex: "男",
      time: "2018年12月12日12时",
      reserve: true,
      reserve_text: "已处理"

    },
    {
      name: "王四",
      phone: 12345678978,
      sex: "女",
      time: "2018年10月02日10时",
      reserve: true,
      reserve_text: "已处理"

    }, {
      name: "王五",
      phone: 12345678978,
      sex: "男",
      time: "2018年8月19日18时",
      reserve: true,
      reserve_text: "已处理"

    }])

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
  web_jump:function(res){
      var idn = res.currentTarget.id;
      var url = this.data.btn_arr[idn].url;
      wx.navigateTo({
        url: url,
      })
  }
})