var recommendAdd = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['首页', '推荐', '信息', '展示'],
    currentTab: 0,
    // 轮播图片
    imgUrls: [
      'https://lg-14y7j4wa-1256666116.cos.ap-shanghai.myqcloud.com/swiper_banner.png',
      'https://lg-14y7j4wa-1256666116.cos.ap-shanghai.myqcloud.com/lun1.jpg',
      'https://lg-14y7j4wa-1256666116.cos.ap-shanghai.myqcloud.com/lun2.jpg'
    ],
    // 推荐列表信息
    recommendArray: [0, 1, 2],
    infoArray: [
      {
        id: 1,
        infoName: '爱咯安姆',
        infoPhone: '15138492262',
        infoAddress: '北京市海淀区西土城5号楼六单元305室'
      },
    ],
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
    showArray: [
      {
        id: 1,
        showSrc: 'https://lg-14y7j4wa-1256666116.cos.ap-shanghai.myqcloud.com/lun1.jpg'
      },
      {
        id: 2,
        showSrc: 'https://lg-14y7j4wa-1256666116.cos.ap-shanghai.myqcloud.com/lun2.jpg'
      },
      {
        id: 2,
        showSrc: 'https://lg-14y7j4wa-1256666116.cos.ap-shanghai.myqcloud.com/lun3.jpg'
      },
    ],
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
      infoArray: [{
        infoName: e.detail.value.infoName,
        infoPhone: e.detail.value.infoPhone,
        infoAddress: e.detail.value.infoAddress
      }],
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
    var delShowArray = this.data.showArray;
    delete delShowArray[e.currentTarget.dataset.showid];
    this.setData({
      showArray: delShowArray,
    })
  },
  // 图片上传
  getPicture: function () {
    var This = this;
    var showImg = This.data.showArray;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0];
        showImg[showImg.length] = {
          id: showImg.length + 1,
          showSrc: tempFilePaths,
        }
        This.setData({
          showArray: showImg,
        })
        wx.setStorageSync("show_img", showImg);

      }
    })
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
  up_pic:function(){
    var that = this;
    wx.chooseImage({
      success: function(res) {
        var img_urls_new = res.tempFilePaths;
        that.setData({
          imgUrls:img_urls_new
        })
      },
      
    })
    
  }
})