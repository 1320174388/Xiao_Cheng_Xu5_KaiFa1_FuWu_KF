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
})