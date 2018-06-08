var config = require('../../../../config.js');//引用config.js文件
var app = getApp();//引用app.js文件
var token;//token令牌
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quanxuan_arr:"",
    // 添加的职位名称
    job_change: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    token=wx.getStorageSync("token");
    // 获取权限列表
    app.post(config.service.host +"/api/admin/position/right",{
      'token':token
    },function(res){
      if(res.data.errNum == 0){
        // 请求成功
        var quanxuan_arr = res.data.retData.list;
        for(var i = 0;i<quanxuan_arr.length;i++){
          quanxuan_arr[i].icon_color = "gray";
          quanxuan_arr[i].checked = false;
        }
        
        that.setData({
          quanxuan_arr: quanxuan_arr
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
  // 多选框点击事件
  jur_choose:function(res){
    var idn = res.currentTarget.id;
    var icon_color = this.data.quanxuan_arr[idn].icon_color;
    var color_gai = "quanxuan_arr[" + idn +"].icon_color";
    var check_gai = "quanxuan_arr[" + idn + "].checked";
    if(icon_color=="gray"){
      this.setData({
        [color_gai]:"green",
        [check_gai]:true
      });
      
    }else{
      this.setData({
        [color_gai]: "gray",
        [check_gai]:false
      });
      
    }
  },
  // 提交按钮
  jump_jur:function(res){
    var form_info = res.detail.value;
    var right = "";
    for (var i = 0; i < form_info.jur_choose.length; i++) {
      right = right + "," + String(form_info.jur_choose[i]);
    }
    right = right.replace(/,/,'');
    // post请求数据
    app.post(config.service.host +'/api/admin/position/create',{
        "token":token,
        "roleName": res.detail.value.job_change,
        "right": right
    },function(res){
      if (res.data.errNum == 0){
        // 成功拿到数据
        // 返回上一页面
        wx.navigateBack({
          delta: 1
        })
      } else if (res.data.errNum == 1){
        // 你没有权限进行此操作
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 2){
        // 请输入职位名称
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 3) {
        // 没有选择权限
        app.point(res.data.retMsg, "none", 1000);
      } else if (res.data.errNum == 4) {
        // 职位已存在
        app.point(res.data.retMsg, "none", 1000);
      }
    })
    
  }
})