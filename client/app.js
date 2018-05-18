//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    }
})

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
              if (res.data.errNum == 0){
                console.log(res.data);
                wx.setStorageSync('token', res.data.retData.token);
              }else{
                console.log(res.data);
              }
            }
          });
        } else {
          console.log('登录失败' + res.errMsg);
        };
      }
    });
  }, 500);
};