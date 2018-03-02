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
  }
  
})
