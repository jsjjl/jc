//index.js
//获取应用实例
const app = getApp();
const loginByWX = require('../../config').loginByWX;

var  uid,
icon,
wxName,
gender;

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that= this;

    //调用应用实例的方法获取全局数据  
    that.getUserInfo();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }




  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

         //获取用户信息
         getUserInfo:function(){ 
          var that = this;  
      
          wx.login({
            success: function(res) {
              if (res.code) {
                  uid = res.code
                  console.log(uid);
                  wx.getUserInfo({  
                     success: function (res) {
                            wxName = res.userInfo.nickName;
                            icon = res.userInfo.avatarUrl;
                            gender = res.userInfo.gender;
                            console.log(wxName,icon,gender);
                          }  
                     });
              } else {

                wx.showModal({
                  title: '提示',
                  content: '获取用户登录态失败！' + res.errMsg,
                  showCancel: false
                })
                
              }
            }
          });
      
        },


  loginClick: function(e){
console.log(loginByWX+'?uid='+uid+'&wxName='+wxName+'&gender='+gender+'&icon='+icon)
    wx.request({
      
      url: loginByWX,

      data: {
        uid: uid,
        icon: icon,
        wxName: wxName,
        gender: gender,
      },
      
      success:function(res){

        if(res.data.state == 0){
          wx.navigateTo({
            url:'../myedit/myedit?myid=' + res.data.id //传参跳转
          })

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



    




  },
  juClick: function(e){
    wx.navigateTo({
      url:"../index/index"
    })
  }
})
