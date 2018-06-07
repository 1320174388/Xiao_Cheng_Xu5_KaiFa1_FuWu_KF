// pages/admin/jurisdiction/jurisdiction.js
var config = require('../../../config.js');//引用config.js文件
var app = getApp();//引用app.js文件
var token;//token令牌
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // 权限数组
      jur_manager_arr:"",
      
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
    var that = this;
    token = wx.getStorageSync("token");
    app.post(config.service.host + '/api/admin/position/show', { "token": token }, function (res) {
      if (res.data.errNum == 1) {
        // 没有权限
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 0) {
        // 成功拿到数据
        that.setData({
          jur_manager_arr: res.data.retData.list
        })
      } else if (res.data.errNum == 2) {
        // 没有添加职位
        app.point(res.data.retMsg, "none", 1000);
      }
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
  // 删除事件
  jur_remove:function(res){
    var that = this;
    var idn = res.currentTarget.id;
    // 删除api
    app.post(config.service.host +'/api/admin/position/delete',{
      "token":token,
      "id":idn
    },function(res){
      if(res.data.errNum == 0){
        // 删除成功
        app.point(res.data.retMsg,"success",1000)
        // 刷新onload
        that.onShow();
      } else if (res.data.errNum == 1){
        // 你没有权限进行此操作
        app.point(res.data.retMsg, "none", 1000)
      } else if (res.data.errNum == 2) {
        // 当前职位已被管理员使用,不可删除
        app.point(res.data.retMsg, "none", 1000)
      } else if (res.data.errNum == 3) {
        // 删除失败
        app.point(res.data.retMsg, "none", 1000)
      }
    });
    
  },
  // 添加事件
  jump_add_job:function(){
    wx.navigateTo({
      url: './addJob/addJob',
    })
  },
  // 修改事件
  jump_modify_job:function(res){
    var arr_idn = res.currentTarget.id;
    var id = this.data.jur_manager_arr[arr_idn].id;
    var job_defalut = this.data.jur_manager_arr[arr_idn].role_name;
    wx.navigateTo({
      url: './modifyJob/modifyJob?id=' + id + '&job_defalut=' + job_defalut,
    })
  }
})