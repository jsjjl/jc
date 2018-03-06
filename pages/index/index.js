//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hotList: [
      {
        pic: '../img/1.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: '../img/1.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: '../img/1.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: '../img/1.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: '../img/1.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  searchClick:function(event){
    console.log(event); 
    wx.navigateTo({url:'../search/search'}) 
  },
  userClick:function(event){
    console.log(event); 
    wx.navigateTo({url:'../sq/sq'}) 
  },
  tagClick:function(event){
    console.log(event); 
    wx.navigateTo({url:'../qylist/qylist'}) 
  },
  postClick:function(event){
    console.log(event); 
    wx.navigateTo({url:'../qypost/qypost'}) 
  },
  sbClick:function(event){
    console.log(event); 
    wx.navigateTo({url:'../sbqy/sbqy'}) 
  }
  
})
