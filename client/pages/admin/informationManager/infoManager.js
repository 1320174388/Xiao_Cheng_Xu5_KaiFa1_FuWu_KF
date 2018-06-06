var config = require('../../../config.js');
var app = getApp();
var recommendAdd = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['首页', '推荐', '信息', '展示'],
    currentTab: 0,
    host: config.infomation.host,
    // 轮播图片
    imgUrls: null,
    // 推荐列表信息
    recommendArray: [0, 1, 2],
    infoArray: null,
    config_content:null,
    config_phone:null,
    config_name:'啊买哦',
    // 添加推荐产品
    recommendAddArray: [
      {
        id: 1,
        recommendAddSrc: 'https://lg-14y7j4wa-1256666116.cos.ap-shanghai.myqcloud.com/AiMeiLi_one.png',
        recommendAddName: '玉泽沐浴液',
        recommendDatiled: '玉泽官方正品 皮肤屏障修护身体乳液，补水滋润润肤露甘油。实验验证有效改善肌肤...'
      },
      {
        id: 2,
        recommendAddSrc: 'https://lg-14y7j4wa-1256666116.cos.ap-shanghai.myqcloud.com/AiMeiLi_two.png',
        recommendAddName: '洗护用品套装',
        recommendDatiled: '玉泽官方正品 皮肤屏障修护身体乳液，补水滋润润肤露甘油。实验验证有效改善肌肤...'
      },
      {
        id: 3,
        recommendAddSrc: 'https://lg-14y7j4wa-1256666116.cos.ap-shanghai.myqcloud.com/images_product_timg.jpg',
        recommendAddName: '玉泽沐浴液',
        recommendDatiled: '玉泽官方正品 皮肤屏障修护身体乳液，补水滋润润肤露甘油。实验验证有效改善肌肤...'
      },
      {
        id: 1,
        recommendAddSrc: 'https://lg-14y7j4wa-1256666116.cos.ap-shanghai.myqcloud.com/lun3.jpg',
        recommendAddName: '玉泽沐浴液',
        recommendDatiled: '玉泽官方正品 皮肤屏障修护身体乳液，补水滋润润肤露甘油。实验验证有效改善肌肤...'
      },
      {
        id: 2,
        recommendAddSrc: 'https://lg-14y7j4wa-1256666116.cos.ap-shanghai.myqcloud.com/lun2.jpg',
        recommendAddName: '洗护用品套装',
        recommendDatiled: '玉泽官方正品 皮肤屏障修护身体乳液，补水滋润润肤露甘油。实验验证有效改善肌肤...'
      },
      {
        id: 3,
        recommendAddSrc: 'https://lg-14y7j4wa-1256666116.cos.ap-shanghai.myqcloud.com/lun1.jpg',
        recommendAddName: '玉泽沐浴液',
        recommendDatiled: '玉泽官方正品 皮肤屏障修护身体乳液，补水滋润润肤露甘油。实验验证有效改善肌肤...'
      },
    ],
    // 推荐跳转添加
    productInfo: true,
    // 推荐产品添加提交
    productSubmit: false,
    // 信息列表
    informationList: true,
    // 信息修改
    informationUpdate: false,
    getInformationInfo: null,
    showArray: null,
    notice_index:null,
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  /**
   * 推荐产品添加
   */
  changeAdd: function () {
    var that = this;
    that.setData({
      productInfo: false,
      productSubmit: true
    })
  },
  /**
   * 推荐产品添加提交
   */
  changeSure: function () {
    var that = this;
    that.setData({
      recommendArray: recommendAdd,
      productInfo: true,
      productSubmit: false
    });
  },
  checkboxChange: function (e) {
    recommendAdd = e.detail.value;
  },
  // 信息设置
  setUpdate: function (e) {
    var that = this;
    that.setData({
      informationUpdate: true,
      informationList: false,
    });
  },
  // 信息修改
  suresUpdate: function (e) {
    var that = this;
    that.setData({
      informationUpdate: false,
      informationList: true,
    });
  },
  // 确认修改信息
  sureUpdate: function (e) {
    this.setData({
      config_name: e.detail.value.config_name,
      config_phone: e.detail.value.config_phone,
      config_address: e.detail.value.config_address,
    });
  },
  // 删除推荐列表信息
  recommendDelete: function (e) {
    var delRecommendArray = this.data.recommendArray;
    delete delRecommendArray[e.currentTarget.dataset.editid];
    this.setData({
      recommendArray: delRecommendArray,
    })
  },
  // 删除展示的图片
  delPicture: function (e) {
    var THIS = this; 
    app.post(
      config.infomation.del_notice_image_file, {
        'token': wx.getStorageSync('token'),
        'notice_index': e.currentTarget.dataset.showid
      }, function (res) {
        THIS.onLoad();
        // if (res.data.errNum == 0) {
        //   app.point(res.data.retMsg, "success");
        //   setTimeout(function () {
        //     THIS.onLoad();
        //   }, 1000);
        // } else {
        //   app.point(res.data.retMsg, "none");
        // };
      }
    );
  },
  // 图片上传
  getPicture: function () {
    var This = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths_new = res.tempFilePaths;
        wx.uploadFile({
          url: config.infomation.set_notice_image_file, //仅为示例，非真实的接口地址
          header: {
            'content-type': 'multipart/form-data'
          },
          filePath: tempFilePaths_new[0],
          name: 'notice_image_file',
          success: function (res) {
            var data = JSON.parse(res.data);
            if (data.errNum == 0) {
              app.point(
                '上传成功',
                'success',
                1000
              );
              This.onLoad();
            }
          }
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This = this;
    // 获取轮播图
    app.post(
      config.infomation.get_service_config_type, {
        'token': wx.getStorageSync('token'),
        service_type: 'config_data'
      }, function (res) {
        This.setData({
          imgUrls: res.data.retData.sowing_map
        });
      },
    );
    // 获取信息配置
    app.post(
      config.infomation.get_service_config_type, {
        'token': wx.getStorageSync('token'),
        service_type: 'config_data'
      }, function (res) {
        This.setData({
          config_address: res.data.retData.config_details.config_address.config_content,
          config_phone: res.data.retData.config_details.config_phone.config_content,
        });
      },
    );
    // 获取展示图片
    app.post(
      config.infomation.get_service_config_type, {
        'token': wx.getStorageSync('token'),
        service_type: 'config_data'
      }, function (res) {
        This.setData({
          showArray: res.data.retData.notice_image
        });
      },
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

/**
 * 上传轮播图
 */
  up_pic:function(){
    var that = this;
    function upload_file(imgUrls,num=0,numbers=1){
      if(numbers > imgUrls.length){
        that.onLoad();
        return false;
      };
      app.point(
        '第' + numbers + '张图片上传中',
        'loading',
        10000
      );
      wx.uploadFile({
        url: config.infomation.sowing_map_file, //仅为示例，非真实的接口地址
        header: {
          'content-type': 'multipart/form-data'
        },
        filePath: imgUrls[num],
        name: 'sowing_map_file',
        formData: {
          'the_first_map': numbers
        },
        success: function (res) {
          var data = JSON.parse(res.data);
          if (data.errNum==0){
            app.point(
              '上传成功',
              'success',
                1000
            );
            upload_file(imgUrls, num+1, numbers+1);
            
          }
        }
      })
    };
      wx.chooseImage({
        count: 6, // 默认6
        success: function (res) {
          var img_urls_new = res.tempFilePaths;
          upload_file(img_urls_new);
        },
      })
   
  }
})