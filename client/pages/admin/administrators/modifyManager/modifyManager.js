// pages/admin/administrators/modifyManager/modifyManager.js
var config = require('../../../../config.js');//引用config.js文件
var app = getApp();//引用app.js文件
var token;//token令牌
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 职位信息
    jur_arr: "",
    // 默认名称和职位
    default_job:"",
    default_id:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取token值
    token = wx.getStorageSync('token');
    // 获取职位信息api
    app.post(config.service.host + '/api/admin/isadmin/roles', {
      'token': token
    }, function (res) {
      if (res.data.errNum == 0) {
        // 请求成功
        var jur_arr = res.data.retData.list;
        for (var i = 0; i < jur_arr.length; i++) {
          jur_arr[i].icon_color = "gray";
          jur_arr[i].checked = false;
        }
        that.setData({
          jur_arr: jur_arr
        });
      } else if (res.data.errNum == 1) {
        // 你没有权限进行此操作
        app.point(res.data.retMsg, "none", 1000)
      } else if (res.data.errNum == 2) {
        // 当前还没有管理职位
        app.point(res.data.retMsg, "none", 1000)
      }
    })
    // 默认名称和职位id
    this.setData({
      default_job: options.def_name,
      default_id: options.def_id
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
    
    // 改变颜色和checked属性值
    var idn = res.currentTarget.id;
    var color_gai = "jur_arr[" + idn + "].icon_color";
    var checked_gai = "jur_arr[" + idn + "].checked";
    for (var i = 0; i < this.data.jur_arr.length;i++){
      var color_gai_arr = "jur_arr[" + i + "].icon_color"
      var checked_gai_arr = "jur_arr[" + i + "].checked";
        this.setData({
          [color_gai_arr]:"gray",
          [color_gai]:"green",
          [checked_gai_arr]:false,
          [checked_gai]:true
        });
        
    }
    
  },

  // 提交
  jump_jur: function (res) {
    // 管理员信息
    var manager = res.detail.value;
    var user_id = this.data.default_id;
    app.post(config.service.host + '/api/admin/isadmin/update', {
      'token': token,
      'admin_id': user_id,
      'admin_name': manager.job_change,
      'role_id': manager.jur_choose
    }, function (res) {
      if (res.data.errNum == 0) {
        // 修改成功
        // 返回上一页面
        wx.navigateBack({
          delta: 1
        })
      } else if (res.data.errNum == 1) {
        // 你没有权限进行此操作
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 2) {
        // 请选择管理员职位
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 3) {
        // 没有输入管理员名称
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 4) {
        // 管理员ID丢失
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 5) {
        // 管理员名称已存在
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 6) {
        // 修改失败
        app.point(res.data.retMsg, "none", 1000);
      }
    })
  }
})