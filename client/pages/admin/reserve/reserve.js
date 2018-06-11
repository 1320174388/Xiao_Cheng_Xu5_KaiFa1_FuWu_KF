// pages/Admin/manage/index.js
var config = require('../../../config.js');

Page({
  data: {
    select: false,
    selected: true,
    reserve_arr_f:"",
    reserve_arr_t:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This = this;
    getApp().post(
      config.Subscribe.Subscribe_lists,{
        'token': wx.getStorageSync('token'),
        'status':1
      },function(res){
        if(res.data.errNum == 0){
          This.setData({
            reserve_arr_f : res.data.retData
          });
        }
      }
    );
    getApp().post(
      config.Subscribe.Subscribe_lists, {
        'token': wx.getStorageSync('token'),
        'status': 2
      }, function (res) {
        if (res.data.errNum == 0) {
          This.setData({
            reserve_arr_t: res.data.retData
          });
        }
      }
    );
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

  reserve_checked:function(res){
    var idn = res.currentTarget.id;
    var reserve_arr_f = this.data.reserve_arr_f
    reserve_arr_f[idn].reserve = !reserve_arr_f[idn].reserve;
    this.setData({
      reserve_arr_f: reserve_arr_f
    })
  },
  select: function (e) {
    if ('w' == e.currentTarget.dataset.w) {
      this.setData({
        select: false,
        selected: true,
      })
    } else if ('y' == e.currentTarget.dataset.y) {
      this.setData({
        select: true,
        selected: false,
      })
    }
  },
  // 确定处理按钮
  reserve_chuli:function(){
    var This = this;
    var reserve_arr_f = this.data.reserve_arr_f;
    var ids = '';
    for(var i = 0;i<reserve_arr_f.length;i++){
      if(reserve_arr_f[i].reserve){
        ids += ','+reserve_arr_f[i].id;
      }
    }
    ids = ids.replace(/,/, '');
    getApp().post(
      config.Subscribe.Subscribe_update, {
        'token': wx.getStorageSync('token'),
        'ids': ids
      }, function (res) {
        if (res.data.errNum == 0) {
          getApp().point(res.data.retMsg,'success',2000);
          This.onLoad();
        }else{
          getApp().point(res.data.retMsg, 'none', 2000);
        }
      }
    );
  }
});