const updateWXUser = require('../../config').updateWXUser;
var myid,
    bdnc;

Page({
  data: {
    nc:""
  },
  onLoad: function (options) {
    var that = this;
    myid = options.myid;
    bdnc = options.bdnc;
    that.setData({
      nc:bdnc
    })
  },
  input_bt: function(e) {
    var that = this;
    that.setData({
      nc:e.detail.value
    })
  },
  saveClick: function() {
     var that = this;
     bdnc = that.data.nc;
    console.log(bdnc)
    wx.request({
      url: updateWXUser,
      data: {
          id: myid,
          nickName: bdnc
      },
      
      success:function(res){
        if(res.data.state == 0){
          wx.showToast({
            icon: 'success',
            title: res.data.msg,
          });
        }else{
          wx.showToast({
            icon: 'loading',
            title: res.data.msg,
          });
        }

      },
      fail:function(res){
          wx.showToast({
              icon: 'loading',
              title: "服务器忙请稍后",
            });
           
      }
    });



  }
})
