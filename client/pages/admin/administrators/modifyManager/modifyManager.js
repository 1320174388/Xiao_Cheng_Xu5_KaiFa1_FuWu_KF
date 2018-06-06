// pages/admin/administrators/modifyManager/modifyManager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quanxuan_arr: [
      {
        "name": "一级管理员",
        "icon_color": "gray",
        "checked":false
      },
      {
        "name": "二级管理员",
        "icon_color": "gray",
        "checked": false
      },
      {
        "name": "三级管理员",
        "icon_color": "gray",
        "checked": false
      }
    ],
    default_job:"",
    qx_idn: "",
    jur_idn: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      default_job: options.def_name,
      qx_idn:options.qx_idn
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

  },
  // 点击单选框
  jur_choose: function (res) {
    this.setData({
      jur_idn: res.currentTarget.id
    })
    // 改变颜色和checked属性值
    var idn = res.currentTarget.id;
    var color_gai = "quanxuan_arr[" + idn + "].icon_color";
    var checked_gai = "quanxuan_arr[" + idn + "].checked";
    for (var i = 0; i < this.data.quanxuan_arr.length;i++){
      var color_gai_arr = "quanxuan_arr[" + i + "].icon_color"
      var checked_gai_arr = "quanxuan_arr[" + i + "].checked";
        this.setData({
          [color_gai_arr]:"gray",
          [color_gai]:"green",
          [checked_gai_arr]:false,
          [checked_gai]:true
        });
        
    }
    
  },
  // 名称
  job_change: function (res) {
    this.setData({
      default_job: res.detail.value
    })
  },
  // 提交
  jump_jur: function () {
    var app = getApp();
    var q_x = this.data.quanxuan_arr;
    for (var i = 0; i < q_x.length; i++) {
      if (q_x[i].checked) {
        this.setData({
          qx_checked: true
        })
      }
    }
    if (this.data.default_job == "") {
      
      app.point("请输入名称", "none", 1000)
    } else {

      if (this.data.qx_checked) {
        var manager_arr = wx.getStorageSync("manager_arr");
        var jur_arr = wx.getStorageSync("jur_arr");
        var manager_new = {
          jur:jur_arr[this.data.jur_idn],
          name:this.data.default_job
        };
        manager_arr.splice(this.data.qx_idn,1,manager_new);
        wx.setStorageSync("manager_arr", manager_arr);
        wx.navigateBack({
          delta:1
        })
        
      } else {
        
        app.point("请选择权限", "none", 1000)
      }
    }
  }
})