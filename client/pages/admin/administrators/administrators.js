// pages/admin/administrators/administrators.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    manager_arr: "",
    jur_arr:"",
    job_change: "",
    qx_idn: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
      manager_arr:wx.getStorageSync("manager_arr"),
      jur_arr:wx.getStorageSync("jur_arr")
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
  // 删除
  jur_remove: function (res) {
    var idn = res.currentTarget.id;
    var man_arr = this.data.manager_arr;
    man_arr.splice(idn, 1);
    this.setData({
      manager_arr: man_arr
    });
  },
  // 添加
  jump_add_job: function () {
    wx.navigateTo({
      url: './addManager/addManager',
    })
  },
  // 修改
  jump_modify_job: function (res) {
    var idn = res.currentTarget.id;
    var default_name = this.data.manager_arr[idn].name;
    wx.navigateTo({
      url: './modifyManager/modifyManager?def_name=' + default_name + '&qx_idn=' + idn,
    })
  }
})