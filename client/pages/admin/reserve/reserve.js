// pages/Admin/manage/index.js

Page({
  data: {
    select: false,
    selected: true,
    reserve_arr_f:"",
    reserve_arr_t:""
  },
  onShow:function(){
    this.setData({
      reserve_arr_f: wx.getStorageSync("reserve_arr_false"),
      reserve_arr_t: wx.getStorageSync("reserve_arr_true")
    })
  },
  reserve_checked:function(res){
    var idn = res.currentTarget.id;
    var reserve_arr_f = wx.getStorageSync("reserve_arr_false");
    reserve_arr_f[idn].reserve = !reserve_arr_f[idn].reserve;
    this.setData({
      reserve_arr_f: reserve_arr_f
    })
    wx.setStorageSync("reserve_arr_false", reserve_arr_f);
    
  },
  select: function (e) {
    if ('w' == e.currentTarget.dataset.w) {
      this.setData({
        select: false,
        selected: true,
        reserve_arr_f:wx.getStorageSync("reserve_arr_false")
      })
    } else if ('y' == e.currentTarget.dataset.y) {
      this.setData({
        select: true,
        selected: false,
        reserve_arr_t: wx.getStorageSync("reserve_arr_true")
      })
    }
  },
  // 确定处理按钮
  reserve_chuli:function(){
    var reserve_arr_f = wx.getStorageSync("reserve_arr_false");
    var reserve_arr_t = wx.getStorageSync("reserve_arr_true");
    for(var i = 0;i<reserve_arr_f.length;i++){
      if(reserve_arr_f[i].reserve){
        reserve_arr_f[i].reserve_text = "已处理";
        reserve_arr_t.push(reserve_arr_f[i]);
        reserve_arr_f.splice(i,1);
        i--;
      }else{

      }
    }
    this.setData({
      reserve_arr_f:reserve_arr_f,
      reserve_arr_t:reserve_arr_t
    })

    wx.setStorageSync("reserve_arr_false", reserve_arr_f);
    wx.setStorageSync("reserve_arr_true", reserve_arr_t);

  }
})