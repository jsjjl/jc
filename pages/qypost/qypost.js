//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    selected:true,
    selected1:false,
    accounts: ["点评这家公司", "QQ", "Email"],
    accountIndex: 0,
    accounts1: ["不锈钢管道", "QQ", "Email"],
    accountIndex1: 0,
    },
  selected:function(e){
    this.setData({
      selected1:false,
      selected:true
    })
  },
  bindAccountChange: function(e) {
      console.log('picker account 发生选择改变，携带值为', e.detail.value);

      this.setData({
          accountIndex: e.detail.value
      })
  },
  bindAccountChange1: function(e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
        accountIndex1: e.detail.value
    })
},
  selected1:function(e){
    this.setData({
      selected:false,
      selected1:true
    })
  },
  cppostClick: function() {
    wx.navigateTo({
      url: '../cppost/cppost'
    })
  },onLoad: function (options) {
    var that = this;
    
    console.log("企业id:",options.qyId)
  }
})