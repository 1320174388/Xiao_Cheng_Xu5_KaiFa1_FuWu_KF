// pages/admin/administrators/addManager/addManager.js
var config = require('../../../../config.js');//引用config.js文件
var app = getApp();//引用app.js文件
var token;//token令牌
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 权限选择的颜色数组
    jur_arr: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    token = wx.getStorageSync("token");
    app.post(config.service.host +'/api/admin/isadmin/roles',{
      'token':token
    },function(res){
      if(res.data.errNum == 0){
        // 请求成功
        var jur_arr = res.data.retData.list;
        for (var i = 0; i < jur_arr.length;i++){
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
  // 权限选择事件
  jur_choose: function (res) {

    // 改变颜色和checked属性值
    var idn = res.currentTarget.id;
    var color_gai = "jur_arr[" + idn + "].icon_color";
    var checked_gai = "jur_arr[" + idn + "].checked";
    for (var i = 0; i < this.data.jur_arr.length; i++) {
      var color_gai_arr = "jur_arr[" + i + "].icon_color"
      var checked_gai_arr = "jur_arr[" + i + "].checked";
      this.setData({
        [color_gai_arr]: "gray",
        [color_gai]: "green",
        [checked_gai_arr]: false,
        [checked_gai]: true
      });

    }

  },
  // 提交信息
  jump_jur: function (res) {
    // 管理员信息
    var manager = res.detail.value;
    app.post(config.service.host +'/api/admin/isadmin/create',{
      'token':token,
      'admin_name':manager.job_change,
      'user_id':manager.id_change,
      'role_id':manager.jur_choose
    },function(res){
      if (res.data.errNum == 0) {
        // 修改成功
        getApp().point('添加成功', 'success', 3000)
        // 返回上一页面
        getApp().timeBack(2000)
      } else if (res.data.errNum == 1) {
        // 你没有权限进行此操作
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 2) {
        // 请选择管理员职位
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 3) {
        // 请输入管理员名称
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 4) {
        // 用户不存在
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 5) {
        // 此用户已经是管理员
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 6) {
        // 管理员名称已存在
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 7) {
        // 管理员添加失败
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 8) {
        // 管理员职位绑定失败
        app.point(res.data.retMsg, "none", 1000);
      }
    })

  }
})