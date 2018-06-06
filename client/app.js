//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index');
var config = require('./config');
var app = getApp();

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },
    /**
     * 封装功能：弹框提示
     * 页面引入：var app = getApp();
     * 调用方法：app.point('提示信息','提示内容：success/none/loading','秒数');
     * 调用实例：app.point('添加成功','success',2000); // 秒数默认200
     */
    point: function (title_info, icon_info, time = 2000) {
      // 弹框
      wx.showToast({
        title: title_info,
        icon: icon_info,
        duration: time
      });
    },
    /**
     * 封装功能：wx.request() 封装函数
     * 页面引入：var app = getApp();
     * 调用方法：app.post('url地址',{'传值键名'：'传值内容'},function(res){
     *            // 传值成功后的回调函数
     *          });
     * 调用实例：app.post('url地址',{'传值键名'：'传值内容'},function(res){
     *            console.log(res.data);
     *          });
     */
    post: function (urls, datas, func) {
      wx.request({
        url: urls,
        data: datas,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success: func
      });
    },
});

login_add();
// 用户登录信息
function login_add(number = 1) {
  if (number == 1) {
    wx.removeStorageSync('token');
    number++;
  }
  setInterval(function () {
    if (wx.getStorageSync('token')) {
      return false;
    }
    setTimeout(function (res) {
      wx.removeStorageSync('token');
    }, 3600000);
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: config.service.cheshiUrl,
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            success: function (res) {
              console.log(res.data);
              wx.setStorageSync('token', res.data.retData.token);
            }
          });
        } else {
          console.log('登录失败' + res.errMsg);
        };
      }
    });
  }, 500);
};