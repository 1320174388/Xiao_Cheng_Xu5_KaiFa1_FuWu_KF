// pages/home/admin/product_management/product_management/product_management.js
var config = require('../../../../config.js');//引入config.js模块
var app = getApp();//引入app.js
var token;//定义token令牌
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 门店列表
    Store_arr: '',
    // 没有添加门店时显示
    job_show:true
    

  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    //获取缓存中的token令牌
    token = wx.getStorageSync('token');
    //获取门店信息
    app.post(config.service.host +'/api/home/Store_Get/get_Store',{},function(res){
      if(res.data.errNum == 0){
        // 请求成功
        var store_arr = res.data.retData;
        if (store_arr.length == 0){
          that.setData({
            Store_arr:'',
            job_show: true,
          })
        } else if (store_arr.length>0){
          for (var i = 0; i < store_arr.length; i++) {
            store_arr[i].store_img_url = config.service.host + res.data.retData[i].store_img_url
          }
          that.setData({
            Store_arr: store_arr,
            job_show:false
          })
        }
        
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
  removeStore: function (res) {
    var that = this;
    var removeId = res.currentTarget.id;
    // 删除api
    app.post(config.service.host +'/api/admin/Store_Management/del_Store',{
      'token':token,
      'store_id':removeId
    },function(res){
      if(res.data.errNum == 0){
        // 删除成功
        app.point(res.data.retMsg,'success',1000);
        // 刷新onload
        that.onLoad();
      } else if(res.data.errNum == 1){
        // 你没有权限进行此操作
        app.point(res.data.retMsg, 'none', 1000)
      } else if (res.data.errNum == 2) {
        // 请发送要删除的门店ID
        app.point("请选择要删除的门店", 'none', 1000)
      } else if (res.data.errNum == 3) {
        // 删除失败
        app.point(res.data.retMsg, 'none', 1000)
      }
    })

  },
  // 编辑
  edit:function(res){
    var index = res.currentTarget.id;
    var store_arr = this.data.Store_arr;
    wx.navigateTo({
      url: '../Store_management_Edit/Store_management_Edit?def_name=' + store_arr[index].store_name + '&def_addr=' + store_arr[index].store_addr + '&def_id=' + store_arr[index].id + '&def_img=' + store_arr[index].store_img_url,
    })
  }
})