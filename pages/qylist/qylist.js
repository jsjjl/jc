//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    selected:true,
    selected1:false
    },
  selected:function(e){
    this.setData({
      selected1:false,
      selected:true
    })
  },
  selected1:function(e){
    this.setData({
      selected:false,
      selected1:true
    })
  },
  postClick: function() {
    wx.navigateTo({
      url: '../qypost/qypost'
    })
  },
  searchClick: function(){
    wx.navigateTo({
      url: '../search/search'
    })
  }
})