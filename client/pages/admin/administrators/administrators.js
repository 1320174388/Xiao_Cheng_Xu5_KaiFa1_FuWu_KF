// pages/admin/administrators/administrators.js
var config = require('../../../config.js');//引用config.js文件
var app = getApp();//引用app.js文件
var token;//token令牌
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 管理员列表
    manager_arr: "",
    jur_arr:"",
    job_show:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    token = wx.getStorageSync("token");
    app.post(config.service.host + '/api/admin/isadmin/show', { "token": token }, function (res) {
      if (res.data.errNum == 0) {
        // 成功拿到数据
        that.setData({
          manager_arr: res.data.retData.list,
          job_show: false
        })
      } else if (res.data.errNum == 1) {
        // 没有权限
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 2) {
        // 当前没有添加管理员
        that.setData({
          manager_arr: "",
          job_show: true
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
  onShow: function () {
    this.onLoad();
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
    var that = this;
    var admin_id = res.currentTarget.id;

    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
          // 删除api
          app.post(config.service.host + '/api/admin/isadmin/delete', {
            "token": token,
            "admin_id": admin_id
          }, function (res) {
            if (res.data.errNum == 0) {
              // 刷新onload
              that.onLoad();
              // 删除成功
              app.point(res.data.retMsg, "success", 1000)

            } else if (res.data.errNum == 1) {
              // 你没有权限进行此操作
              app.point(res.data.retMsg, "none", 1000)
            } else if (res.data.errNum == 2) {
              // 管理员ID丢失
              app.point(res.data.retMsg, "none", 1000)
            } else if (res.data.errNum == 3) {
              // 删除失败
              app.point(res.data.retMsg, "none", 1000)
            }
          })
        }
      }
    })

    
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
    var default_id = this.data.manager_arr[idn].id;
    var default_name = this.data.manager_arr[idn].admin_name;
    wx.navigateTo({
      url: './modifyManager/modifyManager?def_name=' + default_name + '&def_id=' + default_id,
    })
  }
})