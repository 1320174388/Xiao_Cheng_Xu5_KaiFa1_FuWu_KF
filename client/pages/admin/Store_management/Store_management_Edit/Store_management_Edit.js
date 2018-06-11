// pages/home/admin/product_management/product_management_Edit/product_management_Edit.js
var config = require('../../../../config.js');//引入config.js模块
var app = getApp();//引入app.js
var token;//定义token令牌
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 要提交的img路径
    img:"",
    // 默认信息
    def_img: "",
    def_name:"",
    def_id:"",
    def_addr:""
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    token = wx.getStorageSync('token');
    this.setData({
      def_img: e.def_img,
      def_name: e.def_name,
      def_id: e.def_id,
      def_addr: e.def_addr
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
  onShow: function (e) {

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
  //选择图片
  choose: function (ch) {

    var that = this
    wx.chooseImage({

      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({ 
          img: res.tempFilePaths[0],
          def_img: res.tempFilePaths[0]
        })
      }
    })
  },
  // 提交事件
  check: function (res) {
    var that = this;
    // 判断图片是否修改
    if (that.data.img == ''){
      app.post(config.service.host + '/api/admin/Store_Management/edit_Store',{
        'token':token,
        'store_id':that.data.def_id,
        'store_name': res.detail.value.Store_name,
        'store_addr': res.detail.value.Store_addr,
      },function(res){
        if(res.data.errNum == 0){
          // 更新成功
          // 返回上一页
          
          that.timeBack();
         
        } else if(res.data.errNum == 1){
          // 你没有权限进行此操作
          app.point(res.data.retMsg,"none",1000);
        } else if (res.data.errNum == 2) {
          // 请发送要删除的门店ID
          app.point("请选择要修改的门店ID", "none", 1000);
        } else if (res.data.errNum == 3) {
          // 请填写门店名称
          app.point(res.data.retMsg, "none", 1000);
        } else if (res.data.errNum == 4) {
          // 请正确上传门店图片
          app.point(res.data.retMsg, "none", 1000);
        } else if (res.data.errNum == 5) {
          // 更新失败
          app.point(res.data.retMsg, "none", 1000);
        }
      })
    }else{
      wx.uploadFile({
        url: config.service.host + '/api/admin/Store_Management/edit_Store',
        filePath: that.data.img,
        name: 'store_img_file',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        formData: {
          'token': token,
          'store_id': that.data.def_id,
          'store_name': res.detail.value.Store_name,
          'store_addr': res.detail.value.Store_addr,
        },
        success: function (res) {
          if (res.statusCode == 413) {
            app.point('请上传1M以内图片', "none", 1000);
            return false;
          }
          var data = JSON.parse(res.data);
          if (data.errNum == 0) {
            // 更新成功
            // 返回上一页
            that.timeBack();
          } else if (data.errNum == 1) {
            // 你没有权限进行此操作
            app.point(data.retMsg, "none", 1000);
          } else if (data.errNum == 2) {
            // 请发送要删除的门店ID
            app.point("请选择要修改的门店ID", "none", 1000);
          } else if (data.errNum == 3) {
            // 请填写门店名称
            app.point(data.retMsg, "none", 1000);
          } else if (data.errNum == 4) {
            // 请正确上传门店图片
            app.point(data.retMsg, "none", 1000);
          } else if (data.errNum == 5) {
            // 更新失败
            app.point(data.retMsg, "none", 1000);
          }

        }
      })
    }
    

  },
  timeBack: function (time = 1000) {
   

    
      app.point("编辑成功", "success", 3000);

    setTimeout(function () {
      
      wx.navigateBack({
        success: function () {
          delta: 1 
        }
      });
    }, time);
     
  }

})